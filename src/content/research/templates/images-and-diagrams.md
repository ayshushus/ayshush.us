---
title: Images & diagrams · figures and visuals
description: Markdown images, captioned figures, side-by-side, and ASCII diagrams.
date: 2026-05-18
order: 40
tags: [sample, template, images]
---

Images in `public/` are served from the root, so `public/y-wing.jpeg` is just
`/y-wing.jpeg`. The prose styles center images automatically.

## Basic image

Always write real alt text. It's read aloud and shown when the image fails.

![A y-wing starfighter](/y-wing.jpeg)

## Captioned figure

Use a `<figure>` when the image needs a caption:

<figure>
  <img src="/blog-placeholder-1.jpg" alt="Placeholder banner image" style="border-radius: 8px;" />
  <figcaption style="text-align: center; font-size: 0.85rem; opacity: 0.7; margin-top: 0.5rem;">
    Fig 1. A caption explaining what the reader is looking at.
  </figcaption>
</figure>

## Side-by-side

<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin: 1.5rem 0;">
  <img src="/astro-nano.png" alt="Before" style="flex: 1; min-width: 240px; border-radius: 8px;" />
  <img src="/astro-sphere.jpg" alt="After" style="flex: 1; min-width: 240px; border-radius: 8px;" />
</div>

## External image

![NASA Earth image](https://www.nasa.gov/wp-content/uploads/2023/03/blue-marble.jpg)

## ASCII / box diagrams

No plugin needed. A fenced block keeps the spacing exact:

```text
   ┌──────────┐      ┌──────────┐      ┌──────────┐
   │  Client  │ ───▶ │   API    │ ───▶ │    DB    │
   └──────────┘      └──────────┘      └──────────┘
        ▲                  │
        └──── response ────┘
```

> **On Mermaid diagrams:** this site doesn't have a Mermaid integration wired
> up, so ```` ```mermaid ```` blocks render as plain code. Either add the
> integration or paste a pre-rendered SVG/PNG into `public/`. For quick
> sketches, stick with ASCII.
