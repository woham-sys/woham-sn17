# syntax=docker/dockerfile:1
#
# SN17 Image-to-Three.js miner.
#
# Everything is pinned: base image by tag+digest-stable tag, pip packages by exact
# version, the model by revision hash, and node deps by package-lock.
#
# The CUDA 13 forward-compatibility layer is installed deliberately. vLLM 0.28 ships
# torch built for CUDA 13, which refuses to initialise on hosts still running a 570.x
# driver ("NVIDIA driver on your system is too old (found version 12080)"). On
# data-center GPUs cuda-compat lets the CUDA 13 runtime work against that driver, so
# the image runs on both older and newer verification hosts.

FROM nvidia/cuda:13.0.1-cudnn-runtime-ubuntu24.04

ENV DEBIAN_FRONTEND=noninteractive \
    PYTHONUNBUFFERED=1 \
    HF_HUB_DISABLE_XET=1 \
    HF_HOME=/models

RUN apt-get update && apt-get install -y --no-install-recommends \
        python3.12 python3.12-venv python3-pip curl ca-certificates git \
        cuda-compat-13-0 \
        # headless-chrome runtime deps for the render gate
        libnss3 libatk1.0-0t64 libatk-bridge2.0-0t64 libcups2t64 libdrm2 \
        libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 \
        libgbm1 libpango-1.0-0 libcairo2 libasound2t64 \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

ENV LD_LIBRARY_PATH=/usr/local/cuda/compat:${LD_LIBRARY_PATH}

WORKDIR /app

# vLLM and the service deps, pinned.
RUN python3 -m venv /opt/venv \
    && /opt/venv/bin/pip install --no-cache-dir --upgrade pip==25.2 \
    && /opt/venv/bin/pip install --no-cache-dir \
        vllm==0.28.0 \
        fastapi==0.115.6 \
        "uvicorn[standard]"==0.34.0 \
        httpx==0.28.1 \
        loguru==0.7.3 \
        pydantic==2.10.4 \
        huggingface_hub==1.30.0 \
        numpy==2.2.1 \
        pillow==11.1.0
ENV PATH=/opt/venv/bin:${PATH}

COPY tools/ /app/tools/
RUN cd /app/tools/validator && npm ci --omit=dev \
    && cd /app/tools && npm ci --omit=dev

COPY miner/ /app/miner/
COPY main.py entrypoint.sh /app/
RUN chmod +x /app/entrypoint.sh

# Coder model, pinned by revision. Fetched at container start rather than baked in,
# so the image stays small; the API spec allows 4 h from pod start to /status=ready.
ENV CODER_REPO=computer-vision-ai-lab/Qwen-3.6-27B-QuietOtter \
    CODER_REVISION=835818b32fa43ac15b1644aa3f11e1f67500423b \
    CODER_DIR=/models/coder \
    VLLM_BASE_URL=http://127.0.0.1:8001/v1 \
    VLLM_MODEL=quietotter \
    VLLM_API_KEY=local \
    GEN_CONCURRENCY=8 \
    GEN_ATTEMPTS=4 \
    GEN_MAX_TOKENS=12000

EXPOSE 10006

CMD ["/app/entrypoint.sh"]
