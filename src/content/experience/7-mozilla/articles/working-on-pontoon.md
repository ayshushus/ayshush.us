---
title: Prototyping localization autocomplete
description: Building an autocomplete prototype for Pontoon, and what it took to get there.
date: 2026-06-20
tags: [mozilla, pontoon, localization, engineering]
---

Localization tooling is harder than it looks. It has to stay fast for translators making thousands of small edits and stay correct across every locale. The project I want to write about here is a localization autocomplete prototype for Pontoon. This work is still in progress and I am still learning as I go.

## The problem

Translators retype a lot of text that the system has already seen. Similar strings, shared phrases and repeated UI labels show up again and again across products. Pontoon has translation memory to help, but it matches whole strings rather than suggesting the next few words as you type. That gap is where autocomplete fits.

The signal that this mattered came from the sheer volume. Mozilla has more than five million strings across its locales, and a lot of the typing on top of them is predictable.

## The approach

I started by evaluating the corpus itself. Before any model, I needed to know what the data looked like, how clean it was and how much repetition it held. That evaluation covered the full five million strings and shaped every later choice.

From there I benchmarked model families against each other:

- **N-gram baselines** gave me a fast, cheap floor to beat.
- **LSTMs** carried context across a full sequence and set a stronger bar.
- **Autoencoders** helped me study how the strings cluster in a learned space.
- **Transformers** gave the best quality and became the direction I leaned toward.

Each note on this site goes deeper into one of these. The short story is that the modeling only works once the data work is done.

## Trade-offs

| Option | Pro | Con | Chose? |
| --- | --- | --- | --- |
| N-gram model | Trivial to train, very fast | No long-range context | Baseline only |
| LSTM | Streams naturally, compact | Slow to train, weaker on long spans | Considered |
| Transformer | Best quality, long context | Heavier compute footprint | Leaning toward |

I leaned toward the transformer because quality mattered more than raw latency for a first prototype, and KV-caching keeps incremental typing cheap enough to feel live.

## Where it stands

The prototype is not shipped. It is a research effort, and the honest status is in progress. Because Pontoon is open source, the pieces that do land show up publicly on GitHub.

## What I would do differently

If I started over I would spend even more time on data evaluation before touching a model. Most of the early wins came from understanding the strings, not from swapping architectures. That is the lesson I keep relearning.
