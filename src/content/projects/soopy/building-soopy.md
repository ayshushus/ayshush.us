---
title: Building Soopy
description: The build log covering stack, decisions and the parts that fought back.
date: 2025-11-02
tags: [soopy, engineering, build-log]
---

[template]

This writeup is a placeholder. The build details below are invented until I write up how Soopy really came together. The pitch is easy to write. The build is where the assumptions get tested. Here is how it took shape, including the parts I would do differently.

## The stack

Soopy is built with tools I already knew. The pieces that matter:

- **Frontend:** a light setup for a simple UI
- **Backend and API:** a small server doing the coordination
- **Data:** basic storage that was enough for the job
- **Infra and hosting:** somewhere cheap and easy to deploy to

I picked these mostly for familiarity and speed.

## The approach

I started by building the core loop, the riskiest bit, first. The goal was to prove that one thing worked before building anything around it.

Rough order of work:

1. A quick proof of concept
2. Making it usable day to day
3. The part that made it shareable

## Decisions worth noting

| Decision | What I chose | Why |
| --- | --- | --- |
| Auth | Kept it minimal | Less to get wrong early |
| Storage | Something simple | Enough for the scale I had |

The one I went back and forth on most was storage, where the pull was between simple now and scalable later.

## The core of it

The heart of Soopy is roughly this:

```
function process(input) {
  return transform(input)
}
```

Everything else is plumbing around that.

## The parts that fought back

A few things were harder than expected:

- **Odd inputs** that did not fit the happy path
- **A performance snag** that showed up only with bigger inputs

The fix for the worst one was to handle the edge cases explicitly up front, which in hindsight was the right call.

## What I'd change

If I rebuilt it tomorrow, I would rethink the storage layer. I would also skip a feature that was not worth it and lean harder into the core loop that paid off.

## What's next

Open threads: a couple of rough edges to smooth and one design question I have not settled.
