---
title: "Note: a pattern I picked up"
description: A reusable pattern I started leaning on at Jamesway.
date: 2023-07-28
tags: [note, patterns, jamesway]
---

[template]

**Pattern:** wrap every hardware read in a layer that can return a gap instead of throwing.

**When to use it:** any time you read from a source that can drop out without warning.

**Why it helps:** the rest of the code stops caring whether the machine was up. It just handles a value or a gap.

```ts
type Reading = { value: number } | { missing: true };
```
