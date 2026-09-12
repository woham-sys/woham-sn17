# woham-sn17

Bittensor SN17 (404-GEN) miner for the Image-to-Three.js competition.

For every prompt image the service emits one self-contained Three.js ES module
conforming to the subnet output specification.

## Layout

- `pipeline_service/` — the generation service (port 10006): `/health`, `/status`,
  `/generate`, `/results`
- `pipeline_service/llm/spawn.py` — starts the local vLLM servers from `configuration.yaml`
- `pipeline_service/pipeline/` — per-prompt stages: candidate generation, JS checking,
  rendering, and a single-elimination judge bracket over the candidates
- `pipeline_service/modules/renderer/` — headless-Chrome render sidecars
- `configuration.yaml` — models, GPU layout, actor concurrency and ensemble size
- `docker/Dockerfile` — the image the regeneration audit builds and runs
- `hardware.json` — verification hardware requested for regeneration audits (`4xH200`)
- `lora/` — a LoRA experiment that was **evaluated and rejected**; see `lora/README.md`.
  No adapter is loaded by this configuration.

## How a prompt is answered

Each prompt fans out into `actors.coder.ensemble_size` independent candidates. Every
candidate is JS-checked and rendered; survivors enter a single-elimination bracket judged
pairwise by the VLM against the reference image, and the bracket winner is returned.
A duel fires as soon as both of its sub-winners exist, so judging overlaps generation.

## GPU layout

Both models are placed on every GPU rather than split across dedicated cards. The
pipeline alternates between coder-heavy and judge-heavy phases, so dedicating cards to
one model leaves the other half of the box idle for whichever phase is running. Servers
sharing a card are started one at a time, because vLLM sizes its KV cache from the memory
free at profiling time and simultaneous starts both profile an empty card.

## Pinning

Base image, pip packages, npm lockfiles and the model revision are all pinned.

MIT licensed (see LICENSE).
