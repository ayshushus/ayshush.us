---
title: Blog post anatomy · the full skeleton
description: A complete post structure you can copy wholesale, then delete what you don't need.
date: 2026-05-30
order: 100
tags: [sample, template, structure]
---

This is the kitchen-sink template. Duplicate this file, rename it, rewrite the
frontmatter, and start deleting sections you don't need. Every other entry in
**Know / Templates** is a deeper dive on one of the pieces below.

> **Frontmatter cheat sheet** — `title` and `description` show up on the listing
> card and at the top of the page; `date` drives ordering (newest first);
> `order` (optional) is a tiebreaker that floats a post above others on the same
> day; `tags` render as clickable chips; `draft: true` hides a post from the site.

## Lead / hook

Open with one or two sentences that say what the reader will get and why they
should care. Headings on this page automatically become the floating table of
contents, so write them like signposts.

## Background

Set up the problem. Link out to [prior art](/know/templates/links-and-resources)
and drop a callout when something deserves emphasis.

## The main thing

Show the work. Mix prose with [code blocks](/know/templates/code-blocks),
[diagrams](/know/templates/images-and-diagrams), and
[tables](/know/templates/tables) — whatever carries the idea fastest.

```ts
// A small, runnable snippet beats three paragraphs of description.
export function greet(name: string): string {
  return `hello, ${name}`;
}
```

## Walkthrough / demo

Embed a [video](/know/templates/videos) or link a
[file/PDF](/know/templates/files-and-downloads) when a live artifact explains
it better than text.

## Wrap up

Summarize the takeaway in two or three bullets:

- What you built or learned.
- The one gotcha worth remembering.
- Where to go next.

## References

1. [A link list / annotated bibliography](/know/templates/links-and-resources)
2. [A downloadable PDF or dataset](/know/templates/files-and-downloads)
