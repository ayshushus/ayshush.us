---
title: How Typer works
description: Architecture, key decisions and the parts that were genuinely hard.
date: 2024-11-14
tags: [typer, architecture, engineering]
---

[template]

This writeup is a placeholder. The technical details below are invented until I write up how Typer is really put together. If the overview page is the pitch, this is the inside view. The short version: it is a thin layer around one small core that does the real work.

## The stack

Typer is built with tools I already knew well. The main pieces:

- **Input layer** handles what you hand it and checks it makes sense
- **Core** does the actual transformation
- **Output layer** turns the result into something you can use

I picked this setup because shipping mattered more than reaching for anything new.

## The flow, end to end

When you run it, here is roughly what happens:

1. Input is received and parsed
2. The core does its work
3. The result comes back

The interesting logic lives in the core module:

```ts
function run(input) {
  const parsed = parse(input)
  return transform(parsed)
}
```

## Decisions I'd defend

A few choices shaped everything else:

| Decision | Why |
| :--- | :--- |
| No database | Kept the whole thing simple to run |
| Small surface | Fewer moving parts to maintain |

## What was hard

The hardest part was making it feel quick and reliable on odd inputs. My first approach was too clever and broke in ways I could not predict, so I threw it out and went with something plainer that held up.

The thing that still bugs me is a rough edge in how it handles unusual cases, which I would clean up with more time.

## What's next

On the list: a couple of small quality improvements. No promises on timing, since this is a side project I work on when I can.
