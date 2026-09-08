#!/bin/bash
# Start the HTTP service immediately, then bring the coder model up behind it.
#
# Order matters: the orchestrator polls GET /health as soon as the pod is visible and
# treats an unreachable pod as crashed. So uvicorn must bind :10006 first and report
# warming_up while the model downloads and vLLM loads; /status only flips to ready
# once the coder endpoint answers.
set -u

GPUS=$(nvidia-smi -L 2>/dev/null | wc -l)
echo "[entrypoint] visible GPUs: ${GPUS}"

# One coder replica per GPU, each on its own port; the service load-balances across
# them. tensor_parallel_size stays 1 so no cross-GPU interconnect is required.
REPLICAS=${CODER_REPLICAS:-${GPUS}}
[ "${REPLICAS}" -lt 1 ] && REPLICAS=1

echo "[entrypoint] fetching ${CODER_REPO}@${CODER_REVISION}"
python3 - <<'PY'
import os, sys, time
from huggingface_hub import snapshot_download
for attempt in range(1, 9):
    try:
        p = snapshot_download(repo_id=os.environ["CODER_REPO"],
                              revision=os.environ["CODER_REVISION"],
                              local_dir=os.environ["CODER_DIR"],
                              max_workers=8, tqdm_class=None)
        print("[entrypoint] model ready:", p, flush=True)
        break
    except Exception as e:
        print(f"[entrypoint] download attempt {attempt} failed: "
              f"{type(e).__name__}: {str(e)[:160]}", flush=True)
        time.sleep(min(60, 10 * attempt))
else:
    sys.exit("[entrypoint] model download failed")
PY
[ $? -ne 0 ] && exit 1

for i in $(seq 0 $((REPLICAS - 1))); do
  port=$((8001 + i))
  echo "[entrypoint] starting coder replica ${i} on GPU ${i}, port ${port}"
  CUDA_VISIBLE_DEVICES=${i} nohup vllm serve "${CODER_DIR}" \
      --served-model-name "${VLLM_MODEL}" \
      --trust-remote-code \
      --max-model-len 32768 \
      --max-num-seqs 64 \
      --gpu-memory-utilization 0.90 \
      --host 127.0.0.1 --port ${port} --api-key "${VLLM_API_KEY}" \
      > /tmp/vllm_${i}.log 2>&1 &
done

export CODER_PORTS=$(seq -s, 8001 $((8000 + REPLICAS)))
echo "[entrypoint] coder ports: ${CODER_PORTS}"

exec python3 /app/main.py
