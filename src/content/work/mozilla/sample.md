---
title: Sample entry — read me first
description: How this entry's frontmatter maps to what you see on screen.
date: 2024-08-20
tags: [sample, tutorial]
---

This file lives at `src/content/work/mozilla/sample.md`. It's a sample post inside the **Mozilla** subsection of the **Work** section.

For a code walkthrough of the patterns mentioned in this post, see [this YouTube video](https://www.youtube.com/) — placeholder; swap in the actual link.

Three levels of editable content sit above this file:

1. **Section** — title and description for `Work` itself live in `src/content/work/_config.md`. That controls the heading and subtitle you see on `/` and `/work`.
2. **Subsection** — `Mozilla` (and its subtitle) is configured in `src/content/work/mozilla/_config.md`. That controls the card on `/work` and the heading on `/work/mozilla`.
3. **Entry (this file)** — the frontmatter above controls the card on `/work/mozilla` and the page heading at `/work/mozilla/sample`.

Frontmatter fields:

- `title` — page heading and card title in the listing.
- `description` — the subtitle shown under the card title.
- `date` — sorts entries on the subsection page; newest first by default.
- `tags` — optional chips that link to `/tags/<tag>`.
- `draft: true` — hides the entry from listings if you're not ready to publish.

Below the frontmatter is just Markdown. Headings, lists, links, code, images all work normally:

```ts
function hello(name: string) {
  return `Hi, ${name}.`;
}
```

To add another entry, copy this file, rename it (anything except a leading `_`), and edit the frontmatter. To delete it, remove the file.
