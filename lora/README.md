# Coder LoRA — an experiment that was evaluated and rejected

**This adapter is NOT used.** `configuration.yaml` serves the unmodified, pinned
SwiftHeron base model. These scripts are kept as provenance for an adapter we
trained, measured, and decided against; nothing here consumes another miner's
submissions.

Measured on the 128 round-42 prompts (never trained on, except where noted),
judged by the subnet's own judge model, the adapter lost to the base model:

- head-to-head vs base, both seatings: **-0.356** (seats agree on 120/128)
- against the archived round-42 winner: base **+0.156**, adapter **-0.227**
- split by whether the prompt was in the training set:
  **seen (n=32) +0.031, unseen (n=96) -0.521**

The split is why it was rejected: it memorised its 128 training prompts and
generalised worse than the base model everywhere else. Reinforcement-training on
our own bracket winners can only reinforce what the pipeline already does.

- `build_dataset.py` — assembles the SFT set from our own generation runs. Each
  example is the exact single-turn chat the coder sees (system prompt, reference
  image, fixed instruction) paired with a program **this same base model wrote**
  and the subnet's judge model picked as the winner of a 40-candidate bracket.
  308 examples over the 128 round-43 prompts.
- `train_lora.py` — rejection-sampling fine-tune. Loads the FP8 checkpoint
  dequantized to bf16 (so the delta matches the weights vLLM serves), freezes
  everything, trains rank-16 LoRA on the language model's attention and MLP
  projections, and scores loss on answer tokens only. 2 epochs, 78 steps, ~82
  minutes on one H200.

The adapter is served unmerged: merging a delta this small into FP8 weights would
round most of it away.
