---
title: Step-by-step tutorial
description: A how-to skeleton with prerequisites, numbered steps, and checkpoints.
date: 2026-05-14
order: 20
tags: [sample, template, tutorial]
---

Tutorials follow a predictable shape. Tell people what they'll have at the end
and what they need, then walk one step at a time with a checkpoint after each.

## What you'll build

One sentence and ideally a screenshot or [demo video](/know/templates/videos) of
the finished result. Readers decide whether to keep going based on this.

## Prerequisites

> **Before you start, make sure you have:**
>
> - Node 20+ (`node --version`)
> - A terminal and a code editor
> - ~15 minutes

## Step 1: Scaffold the project

Describe the action, then show the exact command:

```bash
npm create astro@latest my-app
cd my-app
```

**Checkpoint:** running `npm run dev` opens a starter page at
`http://localhost:4321`.

## Step 2: Add the feature

Explain *why* before the *how*, then the code:

```ts
// src/lib/greet.ts
export const greet = (name: string) => `hello, ${name}`;
```

**Checkpoint:** importing `greet` and calling `greet("world")` returns
`"hello, world"`.

## Step 3: Verify

Show how to confirm it actually works, whether a test or an expected output.
Don't make readers guess.

```bash
npm run build
# → 0 errors
```

## Troubleshooting

| Symptom                     | Likely cause                | Fix                          |
| --------------------------- | --------------------------- | ---------------------------- |
| `command not found`         | Node not installed / on PATH | Install Node 20+             |
| Port already in use         | Another dev server running   | `lsof -i :4321` then kill it |

## Next steps

Point at what to try next, and link [related posts](/know/templates/links-and-resources).
