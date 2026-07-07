---
title: Building Pendi
description: How it actually got built and the decisions behind it.
date: 2025-04-29
tags: [pendi, engineering, build-log]
---

[template]

This writeup is a placeholder. The build details below are invented until I write up how Pendi really came together. The pitch was easy to say and harder to ship. Here is how it took shape and the parts that fought back.

## The approach

I started with the smallest version that proved the idea was worth it. The goal was to answer one question, whether the core loop was actually useful, before putting more time in.

That early version told me it was worth continuing.

## The stack

Built with tools I already knew:

- **Frontend:** a lightweight setup that kept the UI simple
- **Backend and data:** a small server with basic storage
- **Infra and deploy:** hosted somewhere cheap and easy to push to

I chose these mostly for speed and familiarity rather than anything fancy.

## Key decisions

- **Keep storage simple** rather than reaching for a heavy database
- **Ship the core first** and leave nice-to-haves for later
- **Scope tight** so the thing stayed easy to reason about

## The hard part

The thing that took longest was getting state to stay consistent when the same item changed in more than one place.

```
function update(item, change) {
  return save(apply(item, change))
}
```

The problem was updates racing each other. Serialising the writes fixed it.

## What I'd change

- Rework the storage layer now that I know the real usage
- Repay a shortcut I took early to move faster
- Add the one feature people keep asking me about
