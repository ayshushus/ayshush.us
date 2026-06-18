---
title: Building Soopy
description: The build log — stack, decisions, and the parts that fought back
date: 2025-11-02
tags: [soopy, engineering, build-log]
---

The pitch is easy to write. The build is where the assumptions get tested. Here's how Soopy actually came together — including the parts I'd do differently.

## The stack

Soopy is built with [stack — language / framework]. The pieces that matter:

- **Frontend:** [framework + why]
- **Backend / API:** [runtime + framework]
- **Data:** [database / storage + why that one]
- **Infra / hosting:** [where it runs]
- **Notable libraries:** [the 1-2 dependencies doing real work]

I picked these mostly because [the honest reason — familiarity, speed, cost, or a specific constraint].

## The approach

I started by [the very first thing you built — the riskiest assumption or the core loop]. The goal was to prove [the one thing that had to work] before building anything around it.

Rough order of work:

1. [milestone 1 — the spike / proof of concept]
2. [milestone 2 — making it usable]
3. [milestone 3 — the part that made it shareable]

## Decisions worth noting

| Decision | What I chose | Why |
| --- | --- | --- |
| [decision area, e.g. "auth"] | [the choice] | [tradeoff accepted] |
| [decision area] | [the choice] | [tradeoff accepted] |
| [decision area] | [the choice] | [tradeoff accepted] |

The one I went back and forth on most was [the contested decision] — [the tension between the two options].

## The core of it

The heart of Soopy is roughly this:

```
[pseudocode or shape of the central function/flow —
 the thing that does the actual work]
```

Everything else is plumbing around that.

## The parts that fought back

A few things were harder than expected:

- **[hard problem #1]** — [why it was tricky and how you got around it].
- **[hard problem #2]** — [the gotcha that cost real time].
- **[performance / edge case]** — [what broke at scale or in the weird input].

The fix for [the worst one] was [the eventual solution], which in hindsight [whether it was the right call].

## What I'd change

If I rebuilt it tomorrow, I'd [the biggest do-over]. I'd also probably skip [the thing that wasn't worth it] and lean harder into [the thing that paid off].

## What's next

Open threads: [TODO #1], [TODO #2], and figuring out [the unresolved question].

**Code walkthrough:** [Watch on YouTube](#) — placeholder; replace with the real video link.
