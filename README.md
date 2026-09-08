# woham-sn17

Bittensor SN17 (404-GEN) miner for the Image-to-Three.js competition.

For every prompt image the service emits one self-contained Three.js ES module
conforming to the subnet output specification.

## Layout

- `docker/Dockerfile` — service on port 10006 implementing the batch generation API
- `entrypoint.sh` — fetches the pinned coder model, starts one vLLM replica per GPU,
  then serves the API (readiness waits for the coder endpoint)
- `miner/generator.py` — image → validated Three.js module
- `miner/service.py` — pod state machine (`/health`, `/status`, `/generate`, `/results`)
- `tools/` — the conformance validator and renderer used to gate every candidate
- `hardware.json` — verification hardware requested for regeneration audits

## Gates

Every generated module must pass, in order: the conformance validator; a NaN lint
(curve geometries fed plain arrays render empty with no error); and a render check,
since a module can be perfectly valid and still draw nothing, which scores zero.
The returned root is wrapped so the [-0.5, 0.5] bound holds by construction.

## Pinning

Base image, pip packages, npm lockfiles and the model revision are all pinned.

MIT licensed (see LICENSE).
