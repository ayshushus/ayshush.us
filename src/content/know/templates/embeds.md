---
title: Embeds · gists, tweets, CodePen, maps
description: Patterns for embedding third-party content via iframes and scripts.
date: 2026-05-08
order: 4
tags: [sample, template, embeds]
---

Most platforms give you either an `<iframe>` (easy, works everywhere) or a
`<script>` (richer, but scripts in Markdown can be flaky in static builds).
Prefer iframes when a platform offers one.

## GitHub Gist

Gists ship as a script. If it doesn't render in the static build, fall back to a
plain [link to the gist](https://gist.github.com/EXAMPLE) or paste the code into
a [code block](/know/templates/code-blocks) instead.

```html
<script src="https://gist.github.com/USERNAME/GIST_ID.js"></script>
```

## CodePen

```html
<iframe
  height="400"
  style="width: 100%; border-radius: 8px;"
  scrolling="no"
  title="CodePen demo"
  src="https://codepen.io/team/codepen/embed/PNaGbb?default-tab=result"
  loading="lazy"
  allowfullscreen>
</iframe>
```

## A tweet / post

These rarely survive a static build cleanly. Safest is a blockquote with a link:

> "The best code is no code at all." — someone, probably
>
> — [via the original post](https://twitter.com/EXAMPLE/status/123)

## A map

<iframe
  width="100%"
  height="320"
  style="border: 0; border-radius: 8px;"
  loading="lazy"
  src="https://www.openstreetmap.org/export/embed.html?bbox=-79.4%2C43.6%2C-79.3%2C43.7&layer=mapnik">
</iframe>

> **Rule of thumb:** if an embed needs a `<script>`, test the production build
> (`npm run build && npm run preview`) before trusting it — client scripts
> behave differently than in dev.
