"""LoRA rejection-sampling fine-tune of the SwiftHeron coder on judge-picked winners.

The base checkpoint is FP8 (compressed-tensors, per-channel weight scales). We
dequantize it to bf16 once at load, so the adapter learns a delta relative to
exactly the weights vLLM serves; at inference the adapter rides on the FP8
base via `vllm serve --enable-lora` instead of being merged (a merge followed
by FP8 re-quantization would round most of a small delta away).

The prompt is rebuilt with the model's own chat template and processor so the
token stream matches what vLLM sees (7731 prompt tokens per request in the
round-43 logs); only the answer tokens and the closing <|im_end|> are trained.
"""
import argparse
import json
import math
import os
import random
import time

import torch
import torch.nn.functional as F
from PIL import Image
from safetensors import safe_open
from torch.utils.checkpoint import checkpoint
from transformers import AutoConfig, AutoProcessor, Qwen3_5ForConditionalGeneration

SNAP = ("/workspace/.hf_home/hub/models--computer-vision-ai-lab--Qwen-3.6-27B-SwiftHeron/"
        "snapshots/73d641576ca5c881bc383eef27f5c374ac0d41d6")
EXPECTED_PROMPT_TOKENS = 7731
TARGET = (r"model\.language_model\.layers\.\d+\."
          r"(self_attn\.(q_proj|k_proj|v_proj|o_proj)|mlp\.(gate_proj|up_proj|down_proj))")
CE_CHUNK = 2048
BUCKET = 1024
PAD_ID = 248044  # <|endoftext|>; only ever sits after the last trained token


def log(msg):
    print(f"[{time.strftime('%H:%M:%S', time.gmtime())}] {msg}", flush=True)


def load_model(snap, device):
    cfg = AutoConfig.from_pretrained(snap)
    if hasattr(cfg, "quantization_config"):
        del cfg.quantization_config
    cfg.use_cache = False
    cfg.text_config.use_cache = False
    t0 = time.time()
    with torch.device(device):
        model = Qwen3_5ForConditionalGeneration._from_config(
            cfg, dtype=torch.bfloat16, attn_implementation="sdpa")
    log(f"model skeleton built in {time.time() - t0:.0f}s")

    params = dict(model.named_parameters())
    params.update(dict(model.named_buffers()))
    loaded, unexpected, dequant = set(), [], 0
    t0 = time.time()
    with safe_open(os.path.join(snap, "model.safetensors"), "pt", device="cpu") as f:
        keys = list(f.keys())
        kset = set(keys)
        for k in keys:
            if k.endswith("_scale") or k.endswith("_zero_point"):
                continue
            p = params.get(k)
            if p is None:
                unexpected.append(k)
                continue
            t = f.get_tensor(k).to(device)
            sk = k[: -len("weight")] + "weight_scale" if k.endswith(".weight") else None
            if sk in kset:
                s = f.get_tensor(sk).to(device, torch.float32)
                t = t.to(torch.float32) * s
                dequant += 1
            with torch.no_grad():
                p.copy_(t.to(p.dtype))
            loaded.add(k)
    missing = [n for n, _ in model.named_parameters() if n not in loaded]
    log(f"weights loaded in {time.time() - t0:.0f}s: {len(loaded)} tensors "
        f"({dequant} dequantized from FP8), {len(unexpected)} unexpected, {len(missing)} missing")
    if unexpected:
        log(f"  unexpected sample: {unexpected[:5]}")
    if missing:
        log(f"  missing sample: {missing[:10]}")
        raise SystemExit("checkpoint does not cover the model; refusing to train on random weights")
    return model


def build_example(proc, ex, im_end_id):
    msgs = [
        {"role": "system", "content": ex["system"]},
        {"role": "user", "content": [{"type": "image"}, {"type": "text", "text": ex["user_text"]}]},
    ]
    prompt = proc.apply_chat_template(msgs, tokenize=False, add_generation_prompt=True,
                                      enable_thinking=False)
    img = Image.open(ex["image"]).convert("RGB")
    enc = proc(text=[prompt], images=[img], return_tensors="pt")
    ans = proc.tokenizer(ex["assistant"], add_special_tokens=False).input_ids + [im_end_id]
    ids = torch.cat([enc["input_ids"][0], torch.tensor(ans)])
    mm = torch.cat([enc["mm_token_type_ids"][0], torch.zeros(len(ans), dtype=enc["mm_token_type_ids"].dtype)])
    return {
        "input_ids": ids,
        "mm_token_type_ids": mm,
        "n_prompt": enc["input_ids"].shape[1],
        "pixel_values": enc["pixel_values"],
        "image_grid_thw": enc["image_grid_thw"],
        "stem": ex["stem"],
        "source": ex["source"],
        "prompt_text": prompt,
    }


def _ce_sum(h, t, w):
    return F.cross_entropy((h @ w.t()).float(), t, reduction="sum")


def answer_nll(model, ex, device):
    """Summed NLL of the answer tokens and their count; logits never fully materialize."""
    core = model.base_model.model if hasattr(model, "base_model") else model
    ids = ex["input_ids"].to(device)[None]
    mm = ex["mm_token_type_ids"].to(device)[None]
    # Right-pad to a length bucket: the linear-attention kernels re-autotune for
    # every new sequence length (~14 s each). Everything is causal, so trailing
    # pad tokens cannot change the logits of the real tokens before them.
    pad = -ids.shape[1] % BUCKET
    if pad:
        ids_in = F.pad(ids, (0, pad), value=PAD_ID)
        mm = F.pad(mm, (0, pad), value=0)
    else:
        ids_in = ids
    out = core.model(
        input_ids=ids_in,
        mm_token_type_ids=mm,
        pixel_values=ex["pixel_values"].to(device, torch.bfloat16),
        image_grid_thw=ex["image_grid_thw"].to(device),
        use_cache=False,
    )
    p, n = ex["n_prompt"], ids.shape[1]
    hs = out.last_hidden_state[0, p - 1: n - 1]
    tg = ids[0, p:n]
    w = core.lm_head.weight
    total = hs.new_zeros((), dtype=torch.float32)
    for i in range(0, hs.shape[0], CE_CHUNK):
        total = total + checkpoint(_ce_sum, hs[i:i + CE_CHUNK], tg[i:i + CE_CHUNK], w,
                                   use_reentrant=False)
    return total, tg.numel()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--data", default="/workspace/lora/sft_r43.jsonl")
    ap.add_argument("--out", default="/workspace/lora/adapter")
    ap.add_argument("--snap", default=SNAP)
    ap.add_argument("--rank", type=int, default=16)
    ap.add_argument("--alpha", type=int, default=32)
    ap.add_argument("--lr", type=float, default=1e-4)
    ap.add_argument("--epochs", type=float, default=2.0)
    ap.add_argument("--accum", type=int, default=8, help="examples per optimizer step")
    ap.add_argument("--warmup", type=int, default=4)
    ap.add_argument("--smoke", type=int, default=0,
                    help="run this many single-example steps (longest first), time them, save, exit")
    ap.add_argument("--seed", type=int, default=0)
    a = ap.parse_args()

    random.seed(a.seed)
    torch.manual_seed(a.seed)
    device = "cuda"
    proc = AutoProcessor.from_pretrained(a.snap)
    im_end_id = proc.tokenizer.convert_tokens_to_ids("<|im_end|>")

    rows = [json.loads(l) for l in open(a.data)]
    log(f"{len(rows)} rows from {a.data}")
    t0 = time.time()
    data = [build_example(proc, r, im_end_id) for r in rows]
    log(f"tokenized in {time.time() - t0:.0f}s")
    np_set = sorted({d["n_prompt"] for d in data})
    lens = sorted(d["input_ids"].numel() for d in data)
    ans_tok = sum(d["input_ids"].numel() - d["n_prompt"] for d in data)
    log(f"prompt tokens {np_set} (vLLM saw {EXPECTED_PROMPT_TOKENS}); total seq len "
        f"median {lens[len(lens) // 2]} max {lens[-1]}; answer tokens {ans_tok}")
    log("prompt tail: " + repr(data[0]["prompt_text"][-160:]))
    if np_set != [EXPECTED_PROMPT_TOKENS]:
        log("WARNING: prompt token count differs from what vLLM saw; check the template")

    model = load_model(a.snap, device)
    model.gradient_checkpointing_enable(gradient_checkpointing_kwargs={"use_reentrant": False})
    for p in model.parameters():
        p.requires_grad_(False)

    from peft import LoraConfig, get_peft_model
    lcfg = LoraConfig(r=a.rank, lora_alpha=a.alpha, lora_dropout=0.0, bias="none",
                      target_modules=TARGET)
    model = get_peft_model(model, lcfg)
    n_train = sum(p.numel() for p in model.parameters() if p.requires_grad)
    n_mod = sum(1 for n, _ in model.named_modules() if n.endswith(".lora_A"))
    log(f"LoRA r={a.rank} alpha={a.alpha}: {n_mod} modules, {n_train / 1e6:.1f}M trainable params")
    model.train()

    trainable = [p for p in model.parameters() if p.requires_grad]
    opt = torch.optim.AdamW(trainable, lr=a.lr, weight_decay=0.0, betas=(0.9, 0.999))
    torch.cuda.reset_peak_memory_stats()

    if a.smoke:
        order = sorted(data, key=lambda d: -d["input_ids"].numel())
        picks = order[:2] + [order[len(order) // 2]] * max(0, a.smoke - 2)
        for i, ex in enumerate(picks[: a.smoke]):
            torch.cuda.synchronize()
            t0 = time.time()
            nll, n = answer_nll(model, ex, device)
            (nll / n).backward()
            opt.step()
            opt.zero_grad(set_to_none=True)
            torch.cuda.synchronize()
            dt = time.time() - t0
            L = ex["input_ids"].numel()
            log(f"smoke step {i}: seq {L} (answer {n}) loss {nll.item() / n:.4f} "
                f"{dt:.1f}s = {L / dt:.0f} tok/s, peak {torch.cuda.max_memory_allocated() / 2**30:.1f} GiB")
        total_tokens = sum(lens)
        log(f"one epoch = {total_tokens} tokens")
        model.save_pretrained(a.out)
        log(f"smoke adapter saved to {a.out}")
        return

    steps_per_epoch = math.ceil(len(data) / a.accum)
    total_steps = math.ceil(steps_per_epoch * a.epochs)
    sched = torch.optim.lr_scheduler.LambdaLR(
        opt, lambda s: min(1.0, (s + 1) / a.warmup)
        * 0.5 * (1 + math.cos(math.pi * min(1.0, s / max(1, total_steps)))))
    log(f"{total_steps} optimizer steps ({steps_per_epoch}/epoch, {a.accum} examples each)")

    stream = []
    while len(stream) < total_steps * a.accum:
        perm = data[:]
        random.shuffle(perm)
        stream.extend(perm)
    t_start = time.time()
    hist = []
    for step in range(total_steps):
        batch = stream[step * a.accum:(step + 1) * a.accum]
        ntok = sum(d["input_ids"].numel() - d["n_prompt"] for d in batch)
        tot = 0.0
        for ex in batch:
            nll, _ = answer_nll(model, ex, device)
            (nll / ntok).backward()
            tot += nll.item()
        gn = torch.nn.utils.clip_grad_norm_(trainable, 1.0).item()
        opt.step()
        sched.step()
        opt.zero_grad(set_to_none=True)
        hist.append(tot / ntok)
        el = time.time() - t_start
        eta = el / (step + 1) * (total_steps - step - 1)
        log(f"step {step + 1}/{total_steps} loss {tot / ntok:.4f} gnorm {gn:.3f} "
            f"lr {sched.get_last_lr()[0]:.2e} elapsed {el / 60:.1f}m eta {eta / 60:.1f}m")
        if (step + 1) % steps_per_epoch == 0 or step + 1 == total_steps:
            model.save_pretrained(a.out)
            log(f"adapter saved to {a.out} after step {step + 1}")
    json.dump({"loss": hist, "args": vars(a)}, open(os.path.join(a.out, "train_log.json"), "w"))


if __name__ == "__main__":
    main()
