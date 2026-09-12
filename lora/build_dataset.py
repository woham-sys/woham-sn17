#!/usr/bin/env python3
"""SFT set for a rejection-sampling LoRA: each example is the exact single-turn chat the fork's coder
sees (CODER_SYSTEM_PROMPT; user = prompt image + CODER_USER_TEMPLATE_IMAGE_ONLY; no tools, thinking off)
with a judge-selected program as the answer.

Sources, all round-43 prompts (validation must therefore use other rounds' prompts):
  run1, run2   the fork's bracket winner per prompt (best of ~40 by the subnet's judge model)
  cand         candidates from the 32-prompt dump that beat one real round-43 opponent and at
               least drew the other (cand_duels.jsonl), minus any identical to a bracket winner
"""
import json, os, subprocess, sys
from collections import defaultdict

sys.path.insert(0, "/workspace/fork")
from modules.scene_coder.prompts import CODER_SYSTEM_PROMPT, CODER_USER_TEMPLATE_IMAGE_ONLY

CACHE = "/tmp/sn17_prompts"
OUT = "/workspace/lora/sft_r43.jsonl"


def image(stem):
    p = os.path.join(CACHE, stem + ".png")
    if not os.path.exists(p):
        os.makedirs(CACHE, exist_ok=True)
        subprocess.run(["curl", "-sf", "-A", "Mozilla/5.0", "-o", p,
                        f"https://sn12domain.org/procgen/{stem}.png"], check=True)
    return p


def strip_diag(js):
    return js.split("\n", 1)[1] if js.startswith("// miner-diag:") else js


rows, seen = [], set()
for src in ("run1", "run2"):
    d = f"/workspace/fork_{src}"
    for f in sorted(os.listdir(d)):
        if f.endswith(".js"):
            stem, js = f[:-3], strip_diag(open(os.path.join(d, f)).read())
            rows.append({"stem": stem, "source": src, "assistant": js}); seen.add(js)

verd = defaultdict(dict)
for line in open("/workspace/cand_duels.jsonl"):
    r = json.loads(line); verd[(r["stem"], r["k"])][r["opp"]] = r["s"]
for (stem, k), v in sorted(verd.items()):
    if len(v) == 2 and max(v.values()) == 1 and min(v.values()) >= 0:
        js = open(f"/workspace/cand_dump/{stem}/k{k:02d}.js").read()
        if js not in seen:
            rows.append({"stem": stem, "source": "cand", "assistant": js}); seen.add(js)

with open(OUT, "w") as f:
    for r in rows:
        r.update(image=image(r["stem"]), system=CODER_SYSTEM_PROMPT, user_text=CODER_USER_TEMPLATE_IMAGE_ONLY)
        f.write(json.dumps(r) + "\n")
by = defaultdict(int)
for r in rows:
    by[r["source"]] += 1
chars = [len(r["assistant"]) for r in rows]
print(f"{len(rows)} examples {dict(by)} over {len({r['stem'] for r in rows})} prompts -> {OUT}")
print(f"answer chars: mean {sum(chars) // len(chars)}, max {max(chars)}; system prompt {len(CODER_SYSTEM_PROMPT)} chars")
