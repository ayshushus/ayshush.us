---
title: FAQ & collapsibles
description: Question-and-answer layout plus native expand/collapse sections.
date: 2026-05-10
order: 5
tags: [sample, template, faq]
---

Two patterns here: a flat Q&A (every answer visible, great for skimming and SEO)
and collapsible `<details>` blocks (great when answers are long or most readers
only need one).

## Flat Q&A

### Do I need to know React to use this site?

No. Posts are plain Markdown. The only time you reach for a component is a
[callout](/know/templates/callouts), and even that's optional.

### How does ordering work?

Newest `date` first. Add an `order` number to a post's frontmatter to float it
above others — higher wins.

### Can I hide a post while I draft it?

Yes — set `draft: true` in the frontmatter and it disappears from the site.

## Collapsible details

Native `<details>` needs no JavaScript and works in plain Markdown:

<details>
  <summary><strong>How do I add a brand-new project?</strong></summary>

  Create a folder under a section (e.g. `src/content/know/my-project/`), add a
  `_config.md` with a `title` and `description`, and drop in your first `.md`
  post. It shows up automatically.
</details>

<details>
  <summary><strong>Show the full frontmatter reference</strong></summary>

  ```yaml
  title: string        # required
  description: string  # required
  date: 2026-01-01     # required
  order: number        # optional — sort tiebreaker
  draft: boolean        # optional — hides the post
  tags: [a, b]         # optional — render as chips
  ```
</details>

<details open>
  <summary><strong>This one starts expanded</strong></summary>

  Add the `open` attribute to `<details>` to have it expanded by default.
</details>
