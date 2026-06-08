---
layout: ../../../layouts/PontoonDoc.astro
title: Transformers
description: Self-attention over the whole sequence — the modern default.
order: 40
back: /pontoon/autocomplete
backLabel: Back to Autocomplete
---

Transformers replace recurrence and convolution with **self-attention**: every
token can directly attend to every earlier token. This is the architecture
behind modern autocomplete and GPT-style models.

## Key idea

Each token forms a query, key, and value; attention weights every other token by
relevance and mixes their values:

> Attention(Q, K, V) = softmax(QKᵀ / √dₖ) · V

A **causal mask** prevents attending to future tokens, so the model predicts the
next token from the past only.

## Inputs & representation

- **Input:** token embeddings **+ positional encodings** (attention is
  order-agnostic without them).
- **Model:** stacked masked self-attention + feed-forward blocks.
- **Output:** next-token distribution at every position.

```text
tokens + positions
      ↓
[ masked self-attention ] ←→ all earlier tokens
      ↓
[ feed-forward ] → next-token logits
```

## How it applies to autocomplete

Run the prefix through the decoder; the last position's logits rank
completions. KV-caching makes incremental typing cheap — reuse past keys/values
and only compute the new token. This is the strongest quality option, at higher
compute cost.

## Trade-offs

| Strength                          | Weakness                                  |
| :-------------------------------- | :---------------------------------------- |
| Best quality, long-range context  | Attention is O(n²) in sequence length     |
| Fully parallel training           | Larger memory / compute footprint         |
| KV-cache → fast incremental decode | Needs positional encoding & more data     |

## Decoding strategies

How you turn logits into a suggestion matters as much as the model:

- **Greedy / top-k / top-p (nucleus)** — speed vs. diversity trade-off.
- **Beam search** — better for short, high-confidence completions.

## References

- Vaswani et al. (2017), _Attention Is All You Need_.
- Radford et al., the GPT series (decoder-only LMs).

## Notes / TODO

- [ ] Fine-tune a small decoder-only model on our corpus.
- [ ] Benchmark KV-cache latency for live typing.
