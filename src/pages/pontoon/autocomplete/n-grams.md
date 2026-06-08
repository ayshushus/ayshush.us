---
layout: ../../../layouts/PontoonDoc.astro
title: N-gram language models
description: The classic statistical baseline — predict the next token from the previous n−1.
order: 10
back: /pontoon/autocomplete
backLabel: Back to Autocomplete
---

The simplest useful autocomplete: estimate the probability of the next token
from the counts of short token sequences seen in training data. No neural
network, fast to train, and a strong baseline to beat.

## Key idea

Approximate the full history with the previous **n − 1** tokens (the Markov
assumption):

> P(wₜ | w₁ … wₜ₋₁) ≈ P(wₜ | wₜ₋ₙ₊₁ … wₜ₋₁)

A trigram model (n = 3) predicts the next word from the previous two.

## Inputs & representation

- **Input:** the last n − 1 tokens, as discrete symbols (no embeddings).
- **Model:** a count table with smoothing (Kneser–Ney, Laplace) to handle
  unseen sequences.
- **Output:** a probability distribution over the vocabulary.

```python
# Trigram counts → conditional probability
P(w3 | w1, w2) = count(w1, w2, w3) / count(w1, w2)
```

## How it applies to autocomplete

Given what the user has typed, look up the most probable continuations. Great
for short, high-frequency phrases; weak once context matters beyond a few words.

## Trade-offs

| Strength                     | Weakness                                  |
| :--------------------------- | :---------------------------------------- |
| Trivial to train, very fast  | No long-range context (fixed window)      |
| Interpretable counts         | Sparse — needs smoothing for unseen grams |
| Tiny memory at low n         | Table explodes as n grows                 |

## References

- Jurafsky & Martin, _Speech and Language Processing_, ch. on n-gram LMs.

## Notes / TODO

- [ ] Build a trigram baseline on our corpus and record perplexity.
- [ ] Compare smoothing methods.
