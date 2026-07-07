---
title: What I built at Tueely
description: The retrieval and reasoning systems behind Tueely's restaurant intelligence.
date: 2026-07-02
tags: [project, shipped, impact, software-engineering]
---

The clearest way to describe a job is to point at what you shipped. Here is the main work from my time at Tueely so far.

## The project

The core of my work is a retrieval-augmented generation system that reasons about small businesses. It reads a large body of business data, retrieves what matters for a given question and loops over that context to reach an answer that holds up.

## The problem

A restaurant owner asking "what should I change" is a messy question. The answer depends on the menu, the local market, competitors nearby and the owner's own goals. That data was scattered and none of it was structured for fast lookup. Without that foundation, any model on top would just guess.

## The approach

I built two layers.

- **Data structures.** I parsed more than a million business entities into structures built for fast lookup and similarity search. This is what lets the system find comparable businesses in a fraction of a second instead of scanning everything.
- **Reasoning.** On top of retrieval I added a looped reasoning step. It perturbs the context slightly and reruns, which surfaces answers that stay stable under small changes rather than answers that only look right once.

The whole thing runs in Python.

## What it does

| Piece | What it does |
| --- | --- |
| Entity index | Turns 1M+ businesses into a searchable, comparable store |
| Similarity search | Finds the closest comparable businesses to any query |
| RAG loop | Retrieves context and reasons over it with contextual perturbations |

## Impact

The indexing work cut lookups over the full entity set down to something interactive. That made the reasoning layer usable, since it can now pull the context it needs without stalling. The looped reasoning made the recommendations more consistent, which is what an owner actually trusts.

## What I would do differently

I would formalize how I measure a "good" recommendation earlier. For a while I was tuning by feel. Once I had a way to score answers, the tuning got much faster.
