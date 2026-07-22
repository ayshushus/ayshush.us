---
title: Choosing a model family
description: How I compared n-grams, LSTMs, autoencoders and transformers for the prototype.
date: 2026-07-11
tags: [mozilla, pontoon, machine-learning]
---

*Draft — this one is still being written. The outline below is where it stands.*

The autocomplete notes elsewhere on this site go deep on each architecture. This article is the decision layer above them: how the families compared head to head, and how I landed on a direction for the first prototype.

## What this will cover

- The baseline I set with n-grams, and why a floor mattered
- Where LSTMs held up and where they fell behind
- What autoencoders told me about how strings cluster
- Why transformers led on quality, and the compute cost of that

Full comparison coming — treat the list above as the table of contents.
