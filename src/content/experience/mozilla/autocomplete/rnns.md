---
title: RNNs (LSTM / GRU)
description: Recurrent models that carry a hidden state across the sequence.
date: 2025-02-11
order: 30
tags: [pontoon, mozilla, autocomplete, nlp]
---

Recurrent neural networks process tokens one at a time, maintaining a hidden
state that summarizes everything seen so far. Unlike n-grams, the context window
is (in principle) unbounded.

## Key idea

At each step, combine the current token with the previous hidden state to
produce a new hidden state and a prediction:

> hₜ = f(hₜ₋₁, xₜ)   →   P(wₜ₊₁) = softmax(W · hₜ)

**LSTM** and **GRU** cells add gates so the network can keep or forget
information over long spans, mitigating vanishing gradients.

## Inputs & representation

- **Input:** a sequence of token **embeddings** (learned dense vectors).
- **State:** a fixed-size hidden vector carried left-to-right.
- **Output:** next-token distribution at every position.

```text
x1 → [RNN] → h1 → ŷ1
x2 → [RNN] → h2 → ŷ2   (h1 feeds into h2)
x3 → [RNN] → h3 → ŷ3
```

## How it applies to autocomplete

Feed the typed prefix through the RNN; the final hidden state encodes the
context and the softmax gives ranked completions. Naturally streaming — you
update the state token-by-token as the user types.

## Trade-offs

| Strength                          | Weakness                                |
| :-------------------------------- | :-------------------------------------- |
| Unbounded context in theory       | Sequential → hard to parallelize        |
| Compact, good for on-device       | Struggles with very long dependencies   |
| Streams naturally as user types   | Largely superseded by transformers      |

## References

- Hochreiter & Schmidhuber (1997), _Long Short-Term Memory_.
- Cho et al. (2014), _GRU_.

## Notes / TODO

- [ ] Prototype an LSTM next-token model; compare perplexity vs. the n-gram baseline.
- [ ] Measure latency for on-device streaming.
