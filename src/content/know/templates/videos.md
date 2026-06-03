---
title: Videos · embeds and links
description: YouTube embeds, timestamped links, Loom/Vimeo, and self-hosted clips.
date: 2026-05-26
order: 80
tags: [sample, template, video]
---

You can either embed a player inline (raw HTML works in Markdown here) or just
link out. Embeds keep readers on the page; links are lighter and faster.

## Inline YouTube embed

Drop the `embed/<VIDEO_ID>` URL into an iframe. The wrapper keeps it responsive.

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin: 1.5rem 0;">
  <iframe
    src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
    title="YouTube video player"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; border-radius: 8px;"
  ></iframe>
</div>

> Replace `dQw4w9WgXcQ` with your real video ID. Using `youtube-nocookie.com`
> avoids setting tracking cookies until the viewer hits play.

## Plain links

Sometimes a link is all you need:

- 📺 **Full walkthrough:** [Watch on YouTube](https://www.youtube.com/watch?v=dQw4w9WgXcQ)
- ⏱ **Jump to the demo:** [Watch from 4:12](https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=252s) — append `&t=252s` (seconds) to deep-link a timestamp.
- 🎞 **Playlist:** [The whole series](https://www.youtube.com/playlist?list=PLxxxxxx)

## Loom / Vimeo

Same iframe pattern, different host:

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin: 1.5rem 0;">
  <iframe
    src="https://player.vimeo.com/video/76979871"
    title="Vimeo video player"
    loading="lazy"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; border-radius: 8px;"
  ></iframe>
</div>

For Loom, use a `https://www.loom.com/embed/<ID>` src.

## Self-hosted clip

Put the file in `public/` and reference it by absolute path:

<video controls preload="metadata" style="width: 100%; border-radius: 8px;">
  <source src="/clips/demo.mp4" type="video/mp4" />
  Your browser doesn't support embedded video — <a href="/clips/demo.mp4">download the clip</a>.
</video>
