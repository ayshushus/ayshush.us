---
layout: ../../../layouts/PontoonDoc.astro
title: CNNs for sequences
description: Convolutional models that read local windows in parallel.
order: 30
back: /pontoon/autocomplete
backLabel: Back to Autocomplete
---

Convolutional networks slide learnable filters over the token sequence, capturing
local patterns (character or word n-gram-like features) — but computed in
parallel across the whole sequence rather than step-by-step.

## Key idea

Stack 1-D convolutions; each layer widens the **receptive field**, so deep
stacks (or dilated convolutions) can see long contexts. **Causal** convolutions
mask future tokens so the model only conditions on the past — required for
next-token prediction.

> Receptive field grows with depth × kernel size (× dilation), not with
> sequence position.

## Inputs & representation

- **Input:** token (or character) embeddings arranged as a 1-D signal.
- **Model:** stacked causal/dilated 1-D convs + residual connections.
- **Output:** next-token distribution at each position, all positions at once.

```text
[emb][emb][emb][emb]
   \  |  /              causal conv (kernel=3, masked)
   [ feature ]
       ↓ stack/dilate → wider context
```

## How it applies to autocomplete

Character-level CNNs are good at morphology and typo tolerance; word-level CNNs
capture short phrase patterns. Highly parallel training; fixed receptive field
bounds how much history matters.

## Trade-offs

| Strength                            | Weakness                                |
| :---------------------------------- | :-------------------------------------- |
| Fully parallel (fast training)      | Receptive field is bounded by depth     |
| Strong at local / sub-word patterns | Long-range context needs many layers    |
| Robust to typos (char-level)        | Less common than transformers for LMs   |

## References

- Bai, Kolter & Koltun (2018), _Temporal Convolutional Networks (TCN)_.
- van den Oord et al. (2016), _WaveNet_ (dilated causal convolutions).

## Notes / TODO

- [ ] Try a char-level causal CNN for typo robustness.
- [ ] Measure how receptive-field size affects completion quality.
