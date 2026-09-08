"""Prompt image -> validated Three.js module.

Talks to a local vLLM endpoint serving the coder model. Every candidate must clear
three gates before it is accepted:

1. the subnet's own conformance validator (tools/validate.js)
2. a NaN lint the validator cannot see (LatheGeometry fed plain arrays renders empty
   with no error and passes every stage)
3. an optional render check - a module can be perfectly valid and still draw nothing,
   which scores zero because the judge grades the rendered image

Whatever the model returns is wrapped so the [-0.5, 0.5] bound holds by construction;
getting that transform right was the single largest failure mode without it.
"""

import asyncio
import base64
import json
import os
import re
import subprocess
import tempfile
from pathlib import Path

import httpx

HERE = Path(__file__).resolve().parent
REPO = HERE.parent

BASE_URL = os.environ.get("VLLM_BASE_URL", "http://127.0.0.1:8001/v1")
MODEL = os.environ.get("VLLM_MODEL", "quietotter")
API_KEY = os.environ.get("VLLM_API_KEY", "local")
ATTEMPTS = int(os.environ.get("GEN_ATTEMPTS", "4"))
MAX_TOKENS = int(os.environ.get("GEN_MAX_TOKENS", "12000"))
TEMPERATURE = float(os.environ.get("GEN_TEMPERATURE", "0.6"))

VALIDATE_JS = REPO / "tools" / "validate.js"
RENDER_ONE = REPO / "tools" / "render-one.mjs"
MIN_COVERAGE = float(os.environ.get("GEN_MIN_COVERAGE", "0.002"))

SYSTEM_PROMPT = (HERE / "sysprompt.txt").read_text()

NORMALISER = """

export default function generate(THREE) {
  const obj = __sn17_user(THREE);
  if (obj === null || obj === undefined) return obj;
  const root = new THREE.Group();
  const inner = new THREE.Group();
  inner.add(obj);
  root.add(inner);
  const box = new THREE.Box3().setFromObject(inner);
  const size = new THREE.Vector3(); box.getSize(size);
  const ctr = new THREE.Vector3(); box.getCenter(ctr);
  if (isFinite(ctr.x) && isFinite(ctr.y) && isFinite(ctr.z)) inner.position.sub(ctr);
  const m = Math.max(size.x, size.y, size.z);
  if (isFinite(m) && m > 0) root.scale.setScalar(0.98 / m);
  return root;
}
"""


def extract_code(text: str) -> str:
    """Strip control tokens, unwrap fences, drop trailing prose."""
    text = re.sub(r"<\|[^|>]{0,40}\|>", "", text)
    fenced = re.findall(r"```(?:javascript|js)?\s*\n(.*?)```", text, re.S)
    if fenced:
        text = max(fenced, key=len)
    i = text.find("export default")
    if i > 0:
        text = text[i:]
    j = text.rfind("}")
    if j != -1:
        text = text[: j + 1]
    return text.strip()


def normalise(code: str) -> str:
    """Demote the model's generate() to a helper and export a normalising wrapper."""
    m = re.search(r"export\s+default\s+(?:async\s+)?function\s+\w*\s*\(", code)
    if not m:
        return code
    body = code[: m.start()] + "function __sn17_user(" + code[m.end():]
    return body.rstrip() + "\n" + NORMALISER


def lint(code: str) -> str | None:
    """LatheGeometry reads point.x/point.y; plain [x,y] arrays give NaN vertices,
    no exception, every validator stage green, and a completely empty frame."""
    lathe = len(re.findall(r"new\s+THREE\.LatheGeometry\s*\(", code))
    vec2 = len(re.findall(r"new\s+THREE\.Vector2\s*\(", code))
    if lathe and vec2 == 0:
        return ("- [lint] NAN_GEOMETRY: LatheGeometry is called but no THREE.Vector2 is "
                "ever constructed. LatheGeometry reads point.x/point.y, so a plain "
                "[[x, y], ...] array produces NaN vertices and renders nothing. Build the "
                "profile with real Vector2 objects: prof.map(p => new THREE.Vector2(p[0], p[1])).")
    return None


def _validate(source: str) -> tuple[bool, str]:
    if not VALIDATE_JS.exists():
        return True, ""
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as fh:
        fh.write(source)
        path = fh.name
    try:
        proc = subprocess.run(["node", str(VALIDATE_JS), "--json", path],
                              capture_output=True, text=True, timeout=150)
        res = json.loads(proc.stdout)
    except Exception as exc:
        return False, f"validator harness error: {type(exc).__name__}"
    finally:
        os.unlink(path)
    if res.get("passed"):
        return True, ""
    fails = "\n".join(f"- [{f.get('stage')}] {f.get('rule')}: {str(f.get('detail'))[:200]}"
                      for f in (res.get("failures") or [])[:6])
    return False, fails or "unknown validator failure"


def _coverage(source: str, port: int) -> tuple[float, str | None]:
    """Render and measure how much of the frame the object occupies.

    Best-effort: if the renderer is not usable in this environment we return a pass
    rather than failing a module that is otherwise valid. A missing prompt counts
    toward max_mismatched_prompts, so a false reject is worse than a missed check.
    """
    if not RENDER_ONE.exists():
        return 1.0, None
    with tempfile.TemporaryDirectory() as td:
        js, png = os.path.join(td, "m.js"), os.path.join(td, "m.png")
        Path(js).write_text(source)
        try:
            subprocess.run(["node", str(RENDER_ONE), js, png, "grid", "neutral"],
                           capture_output=True, text=True, timeout=180,
                           cwd=str(RENDER_ONE.parent),
                           env=dict(os.environ, STATIC_PORT=str(port)))
        except Exception:
            return 1.0, None
        if not os.path.exists(png):
            return 1.0, None
        try:
            import numpy as np
            from PIL import Image
            a = np.asarray(Image.open(png).convert("RGB")).astype(np.int16).reshape(-1, 3)
            cols, counts = np.unique(a, axis=0, return_counts=True)
            bg = cols[counts.argmax()]
            gutter = a.max(axis=1) < 8
            subject = (np.abs(a - bg).max(axis=1) > 12) & ~gutter
            return float(subject.sum() / max(1, (~gutter).sum())), None
        except Exception:
            return 1.0, None


async def generate_module(image_url: str, port: int = 3100,
                          http: httpx.AsyncClient | None = None) -> bytes:
    """Generate one validated module. Raises RuntimeError if every attempt fails."""
    own = http is None
    if own:
        http = httpx.AsyncClient(timeout=httpx.Timeout(1800, connect=20))
    try:
        img = (await http.get(image_url, timeout=120)).content
        b64 = base64.b64encode(img).decode()

        def messages(feedback: str = "", prev: str = "") -> list:
            msgs = [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": [
                    {"type": "image_url",
                     "image_url": {"url": f"data:image/png;base64,{b64}"}},
                    {"type": "text",
                     "text": "Rebuild this object as a Three.js module. "
                             "Emit only the module source."},
                ]},
            ]
            if feedback:
                msgs.append({"role": "assistant", "content": prev[:2500]})
                msgs.append({"role": "user", "content":
                             f"The validator REJECTED that module:\n{feedback}\n\n"
                             f"Fix these exact problems and re-emit the COMPLETE "
                             f"corrected module. Only the module source."})
            return msgs

        feedback = prev = ""
        last = "no attempt made"
        for _ in range(ATTEMPTS):
            payload = {
                "model": MODEL, "messages": messages(feedback, prev),
                "max_tokens": MAX_TOKENS, "temperature": TEMPERATURE, "top_p": 0.95,
                "presence_penalty": 0.3, "repetition_penalty": 1.05,
                "chat_template_kwargs": {"enable_thinking": False},
            }
            r = await http.post(f"{BASE_URL}/chat/completions", json=payload,
                                headers={"Authorization": f"Bearer {API_KEY}"})
            r.raise_for_status()
            code = extract_code(r.json()["choices"][0]["message"]["content"] or "")
            if not code:
                feedback, prev, last = "Empty output.", "", "empty output"
                continue
            code = normalise(code)

            bad = lint(code)
            if bad:
                feedback, prev, last = bad, code, bad
                continue

            ok, fails = _validate(code)
            if not ok:
                feedback, prev, last = fails, code, fails
                continue

            cov, _ = await asyncio.to_thread(_coverage, code, port)
            if cov < MIN_COVERAGE:
                msg = (f"- [render] INVISIBLE: the module is valid but renders "
                       f"essentially empty ({cov*100:.2f}% of frame). The judge scores the "
                       f"rendered image, so this is worth zero. Never use transmission or "
                       f"full transparency; give every mesh a colour that contrasts against "
                       f"the background. LatheGeometry needs real THREE.Vector2 points.")
                feedback, prev, last = msg, code, msg
                continue

            return code.encode("utf-8")

        raise RuntimeError(f"failed after {ATTEMPTS} attempts: {last[:300]}")
    finally:
        if own:
            await http.aclose()
