---
title: Keeping suggestions live
description: Latency budgets and caching for autocomplete that has to feel instant.
date: 2026-07-16
tags: [mozilla, pontoon, engineering, performance]
---

*Draft — notes below are a placeholder while I write the real thing.*

A suggestion that arrives late is a suggestion nobody uses. For inline autocomplete, the latency budget is small and unforgiving. This piece is about the engineering that keeps incremental typing cheap enough to feel live.

## What this will cover

- The latency budget a translator actually notices
- Why KV-caching makes per-keystroke inference affordable
- Batching and where it helps versus hurts responsiveness
- Measuring "feels instant" instead of guessing at it

Still drafting — the sections above are the plan.
