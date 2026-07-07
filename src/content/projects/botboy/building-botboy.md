---
title: Building Botboy
description: The approach, the decisions and the parts that fought back.
date: 2025-10-03
tags: [botboy, engineering, build-log]
---

[template]

This writeup is a placeholder. The build details below are invented until I write up how Botboy really came together. The pitch was simple. The build was not. Here is how it came together and where it nearly fell apart.

## The stack

Botboy is built with tools I already reach for.

- **Runner** kicks off the task on a trigger
- **Core logic** does the actual work
- **Storage** keeps track of what ran and when

## The approach

I started with a rough script and grew it toward something I trusted to run on its own. The guiding idea was to keep it dumb and predictable.

1. Got the core task working by hand first
2. Wrapped it so it could run on a trigger
3. Added enough logging to trust it unattended

## Decisions worth noting

| Decision | Alternative considered | Why I chose this |
| --- | --- | --- |
| Simple script | A full framework | Less to maintain |
| Local storage | A hosted database | Cheaper and enough |

## The hard parts

The gnarliest problem was making the thing safe to run repeatedly without doubling up work.

```
if not alreadyDone(task):
    run(task)
    markDone(task)
```

Making each run idempotent is what finally made it click, and it taught me to design for repeats from the start.

## What I'd do differently

- Rethink how it tracks state
- Repay a shortcut I took to ship sooner
- Build out an idea I parked for later

## Status

Early but working, and I use it myself. Next up is hardening the edges.
