from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import sys
import time
from dataclasses import dataclass
from typing import Any

import yaml

from modules.metrics.gpu import _detect_all_gpu_ids, _largest_power_of_two_leq

_LOCAL_HOSTS = ("localhost", "127.0.0.1", "0.0.0.0")
_DEFAULT_VLLM_PORT = 8001
# Default vLLM venv (Qwen-compatible transformers). A client can override it
# with `vllm.vllm_bin` to run from a separate env — e.g. GLM-4.6V needs a newer
# transformers than the coder, so it points at /opt/vllm-glm-env/bin/vllm.
_DEFAULT_VLLM_BIN = "/opt/vllm-env/bin/vllm"
_DEFAULT_REASONING_PARSER = "qwen3"
_AUTO_GPU_TOKENS = {"", "auto", "all"}


@dataclass(frozen=True)
class VllmJob:
    name: str
    model: str
    revision: str | None
    port: int
    gpu_ids: str
    tp: int
    gpu_util: float
    max_len: int
    max_seqs: int
    api_key: str
    vllm_bin: str
    trust_remote_code: bool
    reasoning_parser: str | None
    extra_args: tuple[str, ...]
    dp: int = 1


@dataclass
class _RawSpec:
    """Per-client spec before cross-client GPU allocation."""
    name: str
    model: str
    revision: str | None
    port: int
    gpu_util: float
    max_len: int
    max_seqs: int
    api_key: str
    explicit_ids: list[str] | None
    explicit_tp: int | None
    vllm_bin: str
    trust_remote_code: bool
    reasoning_parser: str | None
    extra_args: tuple[str, ...]
    data_parallel: int = 1

# Check if the URL is a local host
def _is_local(url: str | None) -> bool:
    u = (url or "").lower()
    return any(h in u for h in _LOCAL_HOSTS)


# Get the port from the base URL
def _port_from_base_url(base_url: str | None, override: Any) -> int:
    if override is not None:
        return int(override)
    m = re.search(r":(\d+)(?:/|$)", base_url or "")
    return int(m.group(1)) if m else _DEFAULT_VLLM_PORT


# Parse the explicit GPU IDs from the YAML
def _parse_explicit_ids(raw: Any) -> list[str] | None:
    """Return list of GPU IDs from YAML, or None if auto/missing."""
    if raw is None:
        return None
    s = str(raw).strip().lower()
    if s in _AUTO_GPU_TOKENS:
        return None
    return [x.strip() for x in str(raw).split(",") if x.strip()]

# Parse the explicit tensor parallel size from the YAML
def _parse_explicit_tp(raw: Any) -> int | None:
    if raw is None:
        return None
    try:
        n = int(raw)
    except (TypeError, ValueError):
        return None
    return n if n > 0 else None


# Resolve the reasoning parser: absent -> default ("qwen3"); explicit null/empty -> None (omit flag).
def _parse_reasoning_parser(raw: Any) -> str | None:
    if raw is None:
        return None
    s = str(raw).strip()
    return s or None

# Collect the raw specifications from the YAML
def _collect_raw_specs(cfg: dict[str, Any]) -> list[_RawSpec]:
    llm = cfg.get("llm_clients") or {}
    specs: list[_RawSpec] = []
    for name, spec in llm.items():
        if not isinstance(spec, dict):
            continue
        if spec.get("enabled", True) is False:
            continue
        v = spec.get("vllm") or {}
        if not isinstance(v, dict):
            continue
        model = (v.get("model") or "").strip()
        if not model:
            continue
        base = spec.get("base_url") or ""
        if not _is_local(base):
            continue

        specs.append(_RawSpec(
            name=name,
            model=model,
            revision=(str(v.get("revision")).strip() or None) if v.get("revision") is not None else None,
            port=_port_from_base_url(base, v.get("port")),
            gpu_util=float(v.get("gpu_memory_utilization", 0.90)),
            max_len=int(v.get("max_model_len", 8192)),
            max_seqs=int(v.get("max_num_seqs", 4)),
            api_key=str(v.get("api_key", "local")),
            explicit_ids=_parse_explicit_ids(v.get("gpu_ids")),
            explicit_tp=_parse_explicit_tp(v.get("tensor_parallel_size")),
            vllm_bin=str(v.get("vllm_bin") or _DEFAULT_VLLM_BIN),
            trust_remote_code=bool(v.get("trust_remote_code", False)),
            reasoning_parser=_parse_reasoning_parser(
                v.get("reasoning_parser", _DEFAULT_REASONING_PARSER)
            ),
            extra_args=tuple(str(x) for x in (v.get("extra_args") or []))
            + _lora_args(name, v.get("lora"), cfg),
            data_parallel=int(v.get("data_parallel_size", 1) or 1),
        ))
    return specs


# Serve a LoRA adapter on top of the base model: `vllm.lora: {name, repo, revision}` (revision =
# a full commit sha, so the audit's regeneration loads exactly the live adapter) or `{name, path}`
# for offline runs. Requests select the adapter by sending `model: <name>`, so the actors on this
# client must be configured with that name; otherwise the base model would run silently. The
# adapter is fetched here at the pinned revision, because vLLM's own --lora-modules resolver
# pulls the Hub's default branch with no way to pin it.
def _lora_args(client: str, raw: Any, cfg: dict[str, Any]) -> tuple[str, ...]:
    if not raw:
        return ()
    if not isinstance(raw, dict) or not raw.get("name"):
        raise ValueError(f"{client}: vllm.lora needs a name plus repo+revision (or a local path)")
    name = str(raw["name"])
    users = {a: str(ac.get("model") or "") for a, ac in (cfg.get("actors") or {}).items()
             if isinstance(ac, dict) and ac.get("client") == client}
    if users and name not in users.values():
        raise ValueError(
            f"{client}: LoRA {name!r} is served but no actor on this client selects it "
            f"(actors.*.model = {users}); the base model would run silently"
        )
    for actor, model in users.items():
        if model != name:
            print(f"[vllm-spawn] WARNING actors.{actor}.model={model!r} does not use LoRA {name!r}", flush=True)
    if raw.get("path"):  # local adapter directory, for offline validation runs
        path = src = str(raw["path"])
    else:
        repo, rev = str(raw.get("repo") or ""), str(raw.get("revision") or "")
        if not repo or not re.fullmatch(r"[0-9a-f]{40}", rev):
            raise ValueError(f"{client}: vllm.lora needs repo and revision = a 40-hex commit sha (got {rev!r})")
        from huggingface_hub import snapshot_download
        last: Exception | None = None
        for attempt in range(3):
            try:
                path = snapshot_download(repo_id=repo, revision=rev)
                break
            except Exception as e:  # noqa: BLE001 - transient Hub errors; the last one is surfaced below
                last = e
                time.sleep(10 * (attempt + 1))
        else:
            raise ValueError(f"{client}: could not fetch LoRA {repo}@{rev} after 3 attempts: {last}") from last
        src = f"{repo}@{rev}"
    acfg = os.path.join(path, "adapter_config.json")
    if not os.path.isfile(acfg):
        raise ValueError(f"{client}: LoRA {src} has no adapter_config.json at {path}")
    with open(acfg) as f:
        rank = int(json.load(f).get("r") or 0)
    max_rank = max(rank, int(raw.get("max_rank") or 0)) or 16
    print(f"[vllm-spawn] {client}: LoRA {name} = {src} -> {path} (r={rank}, --max-lora-rank {max_rank})", flush=True)
    return (
        "--enable-lora",
        "--max-lora-rank", str(max_rank),
        "--max-loras", "1",
        "--lora-modules", f"{name}={path}",
    )

# Allocate the GPUs to the specifications
def _allocate_gpus(specs: list[_RawSpec], all_gpus: list[str]) -> dict[str, list[str]]:
    """
    Input:
        specs: list of raw specifications
        all_gpus: list of all visible GPUs
    Output:
        assigned: dictionary of client names to list of GPU IDs
    """
    assigned: dict[str, list[str]] = {}
    used: set[str] = set()

    # Phase 1: explicit gpu_ids
    for s in specs:
        if s.explicit_ids is None:
            continue
        for g in s.explicit_ids:
            if g not in all_gpus:
                raise ValueError(
                    f"{s.name}: gpu_ids includes {g!r} but visible GPUs are {all_gpus}"
                )
            used.add(g)
        assigned[s.name] = list(s.explicit_ids)

    # Explicit gpu_ids may overlap: the pipeline alternates between coder-heavy
    # (generating candidates) and judge-heavy (resolving the bracket) phases, so
    # dedicating cards to one model leaves the other half of the box idle for
    # whichever phase is running. Co-locating both models on every card lets each
    # phase use the whole box. Memory is the operator's to budget -- the summed
    # gpu_memory_utilization of the clients sharing a card must leave room for both.
    shared: dict[str, list[str]] = {}
    for s in specs:
        if s.explicit_ids is None:
            continue
        for g in s.explicit_ids:
            shared.setdefault(g, []).append(s.name)
    for g, names in sorted(shared.items()):
        if len(names) < 2:
            continue
        util = sum(sp.gpu_util for sp in specs if sp.name in names)
        if util > 0.97:
            raise ValueError(
                f"GPU {g} is shared by {names} whose gpu_memory_utilization sums "
                f"to {util:.2f}; leave headroom (<=0.97) or give them separate cards"
            )
        print(f"[vllm-spawn] GPU {g} shared by {', '.join(names)} | summed util {util:.2f}", flush=True)

    # Phase 2: auto gpu_ids + explicit tp
    free = [g for g in all_gpus if g not in used]
    for s in specs:
        if s.explicit_ids is not None:
            continue
        if s.explicit_tp is None:
            continue
        if len(free) < s.explicit_tp:
            raise ValueError(
                f"{s.name}: tensor_parallel_size={s.explicit_tp} but only "
                f"{len(free)} GPU(s) free after explicit reservations"
            )
        assigned[s.name] = free[: s.explicit_tp]
        free = free[s.explicit_tp:]

    # Phase 3: fully auto — split remaining evenly
    auto_specs = [s for s in specs if s.name not in assigned]
    if auto_specs:
        if len(free) < len(auto_specs):
            raise ValueError(
                f"{len(auto_specs)} auto client(s) but only {len(free)} GPU(s) "
                f"free — specify gpu_ids explicitly or remove a client"
            )
        per = len(free) // len(auto_specs)
        remainder = len(free) % len(auto_specs)
        idx = 0
        for i, s in enumerate(auto_specs):
            n = per + (1 if i < remainder else 0)
            assigned[s.name] = free[idx: idx + n]
            idx += n

    return assigned


def _finalize_jobs(specs: list[_RawSpec], assigned: dict[str, list[str]]) -> list[VllmJob]:
    """Decide the tensor parallel size for each job
    Input:
        specs: list of raw specifications
        assigned: dictionary of client names to list of GPU IDs
    Output:
        jobs: list of vLLM jobs
    """
    pow2 = os.environ.get("VLLM_TP_POWER_OF_TWO", "").strip() in ("1", "true", "yes")
    jobs: list[VllmJob] = []
    for s in specs:
        ids = assigned[s.name]
        # With data parallelism the client owns tp * dp GPUs: dp independent
        # replicas, each sharded over tp cards.
        dp = max(1, s.data_parallel)
        if s.explicit_tp is not None:
            if s.explicit_tp * dp != len(ids):
                raise ValueError(
                    f"{s.name}: tensor_parallel_size={s.explicit_tp} * "
                    f"data_parallel_size={dp} = {s.explicit_tp * dp} but "
                    f"{len(ids)} GPU(s) assigned ({ids})"
                )
            tp = s.explicit_tp
        else:
            tp = max(1, len(ids) // dp)
            if pow2:
                tp = _largest_power_of_two_leq(tp)
        jobs.append(VllmJob(
            name=s.name, model=s.model, revision=s.revision, port=s.port,
            gpu_ids=",".join(ids), tp=tp, dp=dp,
            gpu_util=s.gpu_util, max_len=s.max_len,
            max_seqs=s.max_seqs, api_key=s.api_key,
            vllm_bin=s.vllm_bin, trust_remote_code=s.trust_remote_code,
            reasoning_parser=s.reasoning_parser, extra_args=s.extra_args,
        ))
    return jobs


def _build_jobs(cfg: dict[str, Any]) -> list[VllmJob]:
    """Build the vLLM jobs from the configuration
    Input:
        cfg: dictionary of configuration
    Output:
        jobs: list of vLLM jobs
    """
    # Collect the raw specifications from the YAML
    specs = _collect_raw_specs(cfg)
    if not specs:
        return []
    # Detect all visible GPUs
    all_gpus = _detect_all_gpu_ids()
    # Allocate the GPUs to the specifications
    assigned = _allocate_gpus(specs, all_gpus)
    # Decide the tensor parallel size for each job
    jobs = _finalize_jobs(specs, assigned)

    print(
        f"[vllm-spawn] Visible GPUs: {all_gpus} | Local Clients: "
        f"{[s.name for s in specs]}",
        flush=True,
    )
    return jobs


def _build_cmd(job: VllmJob) -> list[str]:
    cmd = [
        job.vllm_bin, "serve", job.model,
        "--port", str(job.port),
        "--api-key", job.api_key,
        "--max-model-len", str(job.max_len),
        "--tensor-parallel-size", str(job.tp),
        *(["--data-parallel-size", str(job.dp)] if job.dp > 1 else []),
        "--gpu-memory-utilization", str(job.gpu_util),
        "--max_num_seqs", str(job.max_seqs),
        "--generation-config", "vllm",
        "--enable-prefix-caching",
        "--enable-chunked-prefill",
        "--max-num-batched-tokens", "8192",
    ]
    if job.revision:
        cmd += ["--revision", job.revision, "--tokenizer-revision", job.revision]
    if job.reasoning_parser:
        cmd += ["--reasoning-parser", job.reasoning_parser]
    if job.trust_remote_code:
        cmd.append("--trust-remote-code")
    cmd += list(job.extra_args)
    return cmd


def _bin_exists(path: str) -> bool:
    """True if the vLLM binary is runnable (absolute/relative path or on PATH)."""
    if "/" in path:
        return os.path.isfile(path) and os.access(path, os.X_OK)
    return shutil.which(path) is not None


def _spawn_one(job: VllmJob) -> subprocess.Popen:
    env = os.environ.copy()
    env["CUDA_VISIBLE_DEVICES"] = job.gpu_ids
    # vLLM's API server gives up on its engine cores after VLLM_ENGINE_READY_TIMEOUT_S
    # (default 600) and exits, leaving the engine running but nothing listening. Two
    # clients loading 50 GB of weights at once, plus MTP and LoRA graph capture, can
    # exceed that on a cold box: measured 600s+ on 4xH200. Raise it; the readiness
    # check that follows is what actually bounds startup.
    env.setdefault("VLLM_ENGINE_READY_TIMEOUT_S", "3600")
    cmd = _build_cmd(job)
    print(
        f"[vllm-spawn] Starting vLLM Client: {job.name} | Model: {job.model} | "
        f"Revision: {job.revision or 'main'} | Port: {job.port} | "
        f"GPUs: {job.gpu_ids} | Tensor Parallel Size: {job.tp} | "
        f"Data Parallel Size: {job.dp} | bin: {job.vllm_bin} | "
        f"reasoning_parser: {job.reasoning_parser or '-'} | trust_remote_code: {job.trust_remote_code}",
        flush=True,
    )
    return subprocess.Popen(cmd, env=env, start_new_session=True)


def _wait_serving(job: VllmJob, timeout: float = 2400.0) -> bool:
    """Block until a server answers on its port.

    Only used when jobs share a GPU. vLLM sizes its KV cache from the memory that is
    free at profiling time, so two servers starting at once on one card both profile
    an empty card: the first claims a share of the whole card and the second finds no
    room left for cache blocks and dies. Starting them one at a time makes the second
    profile what the first actually left.
    """
    import urllib.error
    import urllib.request

    url = f"http://127.0.0.1:{job.port}/v1/models"
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            req = urllib.request.Request(url, headers={"Authorization": f"Bearer {job.api_key}"})
            with urllib.request.urlopen(req, timeout=5) as resp:
                if resp.status == 200:
                    return True
        except Exception:  # noqa: BLE001 - not up yet is the normal case here
            pass
        time.sleep(5)
    return False


def main() -> int:
    path = os.environ.get("CONFIG_FILE", "/workspace/configuration.yaml")
    try:
        with open(path) as f:
            cfg = yaml.safe_load(f) or {}
    except FileNotFoundError:
        print(f"[vllm-spawn] Configuration file not found: {path}", file=sys.stderr)
        return 1
    except yaml.YAMLError as e:
        print(f"[vllm-spawn] Invalid YAML in {path}: {e}", file=sys.stderr)
        return 1

    try:
        jobs = _build_jobs(cfg)
    except ValueError as e:
        print(f"[vllm-spawn] Error: {e}", file=sys.stderr)
        return 1

    if not jobs:
        print("[vllm-spawn] No local vLLM clients configured — nothing to start", flush=True)
        return 0

    # Spawn each job independently: a missing binary or launch failure for one
    # client must NOT abort the others (e.g. GLM env not built yet should still
    # let the coder come up).
    # Jobs that share a card must come up one at a time, smallest memory budget first:
    # the later server then profiles the memory its predecessor actually left, instead of
    # claiming a share of a card it only appears to have to itself.
    gpu_users: dict[str, int] = {}
    for j in jobs:
        for g in j.gpu_ids.split(","):
            gpu_users[g] = gpu_users.get(g, 0) + 1
    serialize = any(n > 1 for n in gpu_users.values())
    if serialize:
        jobs = sorted(jobs, key=lambda j: j.gpu_util)
        print(
            "[vllm-spawn] GPUs are shared -> starting servers sequentially: "
            + ", ".join(f"{j.name}({j.gpu_util})" for j in jobs),
            flush=True,
        )

    failures = 0
    for idx, j in enumerate(jobs):
        if not _bin_exists(j.vllm_bin):
            print(
                f"[vllm-spawn] ERROR {j.name}: vLLM binary not found: {j.vllm_bin!r} — "
                f"build the env (e.g. `bash scripts/setup_glm_vllm_env.sh`) or fix "
                f"`vllm.vllm_bin` in the config. Skipping this client.",
                file=sys.stderr,
            )
            failures += 1
            continue
        try:
            _spawn_one(j)
            if serialize and idx < len(jobs) - 1:
                if _wait_serving(j):
                    print(f"[vllm-spawn] {j.name} is serving; starting the next client", flush=True)
                else:
                    print(
                        f"[vllm-spawn] ERROR {j.name}: never came up; the next client would "
                        f"mis-profile the shared card",
                        file=sys.stderr,
                    )
                    failures += 1
        except Exception as e:  # noqa: BLE001 - one client's failure must not kill the rest
            print(f"[vllm-spawn] ERROR {j.name}: spawn failed: {e}", file=sys.stderr)
            failures += 1

    launched = len(jobs) - failures
    print(
        f"[vllm-spawn] {launched}/{len(jobs)} vLLM instances launched in background",
        flush=True,
    )
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
