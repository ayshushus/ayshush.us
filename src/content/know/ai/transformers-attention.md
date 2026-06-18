---
title: How transformer self-attention actually works
description: Q/K/V projections, causal masking, and why the KV-cache makes generation fast.
date: 2025-03-11
tags: [transformers, attention, inference, kv-cache]
---

Self-attention is the mechanism that lets every token in a sequence look at every other token and decide what to pull in. This note walks through the math, the causal mask that makes decoding work, and the KV-cache that makes it cheap.

## Queries, keys, and values

Each token's embedding is projected into three vectors using learned weight matrices. For an input matrix `X` of shape `(seq_len, d_model)`:

```python
Q = X @ W_q   # what this token is looking for
K = X @ W_k   # what each token offers as a match
V = X @ W_v   # what each token actually contributes
```

Attention scores are the dot product of queries against keys, scaled and softmaxed into weights, then used to mix the values.

> Attention(Q, K, V) = softmax( Q·Kᵀ / √d_k ) · V

The `√d_k` scaling matters: without it, dot products grow with dimension, pushing the softmax into saturated regions where gradients vanish.

## Multi-head attention

A single attention operation can only express one "kind" of relationship. Multi-head attention runs `h` independent attention computations in parallel on slices of the embedding, then concatenates:

| Component | Shape per head | Purpose |
| :--- | :--- | :--- |
| Q, K, V | `(seq, d_model / h)` | independent subspaces |
| heads | `h` of them | learn distinct relations |
| output | concat → `(seq, d_model)` | projected by `W_o` |

One head might track subject-verb agreement, another local adjacency. The split is cheap because total compute stays roughly constant.

## Causal masking

Decoder-only models (the GPT family) must not let a token attend to future tokens during training, or they would trivially "cheat" by reading the answer. The fix is a mask added to the scores before softmax:

```text
       t0    t1    t2    t3
t0  [  0  | -inf | -inf | -inf ]
t1  [  0  |  0   | -inf | -inf ]
t2  [  0  |  0   |  0   | -inf ]
t3  [  0  |  0   |  0   |  0   ]
```

`-inf` becomes zero after softmax, so position `t1` only sees `t0` and itself. This lower-triangular mask is what makes a single forward pass equivalent to predicting every next token simultaneously.

## The KV-cache

At generation time you produce one token at a time. Naively, generating token `n` recomputes K and V for all `n` previous tokens — `O(n²)` wasted work across a sequence. But past keys and values never change. So you cache them.

```python
# step n: only the new token needs fresh Q, K, V
k_new, v_new = project(token_n)
K = cat([K_cache, k_new])   # append, don't recompute
V = cat([V_cache, v_new])
scores = q_new @ K.T         # one query against all keys
```

The cache turns per-step cost from `O(n²)` to `O(n)`. The price is memory: the cache grows linearly with sequence length and dominates VRAM for long contexts, which is exactly what techniques like grouped-query attention and paged KV-caches exist to tame.

## Wrap up

- Attention is a learned, content-based weighted average: queries match keys, weights mix values.
- The causal mask is the single trick that turns attention into an autoregressive language model.
- The KV-cache trades memory for speed and is the main lever (and bottleneck) in long-context inference.

## References

- Vaswani et al., *Attention Is All You Need* (2017)
- Ainslie et al., *GQA: Training Generalized Multi-Query Transformer Models* (2023)
