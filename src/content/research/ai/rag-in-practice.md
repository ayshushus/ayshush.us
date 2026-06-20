---
title: Retrieval-augmented generation in practice
description: Chunking, embeddings, reranking, and the failure modes that quietly wreck RAG quality.
date: 2025-09-04
tags: [rag, embeddings, retrieval, reranking]
---

RAG sounds simple — fetch relevant text, stuff it in the prompt, answer grounded in it. In practice quality lives or dies in the retrieval pipeline. This note covers the stages and the ways each one fails.

## The pipeline

```text
docs → chunk → embed → index
                          │
query → embed → search ───┤→ candidates → rerank → top-k → LLM
```

Two embedding passes, one offline (documents) and one online (the query), meet in a vector index. Retrieval gives candidates; a reranker sharpens them; the LLM answers using only what survives.

## Chunking

You can't embed a whole document and expect a useful match — embeddings blur as text grows. Split it, but split well.

| Strategy | When it works | Risk |
| :--- | :--- | :--- |
| Fixed tokens (e.g. 512) | uniform prose | cuts mid-sentence/idea |
| Sentence/paragraph | structured docs | uneven sizes |
| Semantic (split on topic shift) | mixed content | costs an extra model pass |

Add **overlap** (10-20%) so a fact spanning a boundary survives in at least one chunk. Keep a small header (title, section) on each chunk so the embedding has context.

## Embeddings and search

Each chunk becomes a dense vector; similarity is usually cosine.

> cos(a, b) = (a · b) / (‖a‖ ‖b‖) — closer to 1 means more semantically similar.

Pure vector search misses exact-match needs (error codes, IDs, rare names) because embeddings generalize away surface form. **Hybrid search** combines dense vectors with sparse keyword scoring (BM25):

```python
score = alpha * dense_sim + (1 - alpha) * bm25_score
```

This single change fixes a large share of "why didn't it find the obvious document" complaints.

## Reranking

Vector search optimizes for speed and recall, not precision — it returns plausibly-related chunks. A cross-encoder reranker scores each `(query, chunk)` pair jointly and reorders:

```python
candidates = vector_search(query, k=50)   # high recall, noisy
ranked = reranker.score(query, candidates)
context = ranked[:5]                       # high precision, fed to LLM
```

Retrieving 50 then reranking to 5 consistently beats retrieving 5 directly. The bi-encoder casts a wide net; the cross-encoder reads carefully.

## Failure modes

- **Lost in the middle.** Models attend best to the start and end of context; a correct chunk buried in the middle gets ignored. Put the strongest candidates at the edges.
- **Chunk too small.** The right answer needs surrounding context the chunk dropped. The model sees a fragment and hedges or hallucinates.
- **Semantic mismatch.** The query and the answer use different vocabulary ("how do I cancel" vs. "subscription termination"). Hybrid search and query rewriting help.
- **No-answer cases.** If nothing relevant exists, retrieval still returns its top-k — now you've handed the model irrelevant text it may treat as authoritative. Add a relevance threshold and let the model say "not found."
- **Stale index.** Documents changed; embeddings didn't. Re-embed on update or you ground answers in deleted facts.

## Wrap up

- Retrieval quality, not the LLM, is usually the ceiling on RAG accuracy.
- Hybrid search + rerank (retrieve wide, narrow precisely) is the highest-leverage default.
- Design for the no-answer case explicitly — silence beats a confident wrong grounding.

## References

- Lewis et al., *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks* (2020)
- Liu et al., *Lost in the Middle: How Language Models Use Long Contexts* (2023)
