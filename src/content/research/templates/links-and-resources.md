---
title: Links & resources · every linking pattern
description: Inline links, reference-style, link lists, footnotes, and related posts.
date: 2026-05-22
order: 60
tags: [sample, template, links]
---

Links are the connective tissue of a blog. Here's every pattern worth keeping
around.

## Inline links

The everyday kind: [a regular link](https://example.com), an
[internal link to another post](/know/templates/code-blocks) and a
[mailto link](mailto:hello@example.com).

## Reference-style links

Handy when the same URL shows up repeatedly or you want clean prose. The
definitions live at the bottom of the file and don't render:

The [Astro docs][astro] are great, and so is the [MDN reference][mdn].

[astro]: https://docs.astro.build
[mdn]: https://developer.mozilla.org

## A curated link list

- [Astro](https://astro.build) is the framework this site is built on.
- [Tailwind CSS](https://tailwindcss.com) handles the styling.
- [Pagefind](https://pagefind.app) is the static search that powers the search box.

## Annotated bibliography / further reading

> **Further reading**
>
> - **"Attention Is All You Need"**, the transformer paper. [PDF](https://arxiv.org/pdf/1706.03762).
>   *Why it matters:* the architecture behind basically everything in modern ML.
> - **"A Plan for Spam"** by Paul Graham. [essay](http://www.paulgraham.com/spam.html).
>   *Why it matters:* a clean, readable walkthrough of naive Bayes in the wild.

## Footnotes

Markdown footnotes are great for asides that would break the flow.[^1] You can
have several.[^note]

[^1]: This renders as a numbered note at the bottom of the page with a back-link.
[^note]: Footnote labels can be words, not just numbers.

## Related posts

End a post by pointing readers somewhere useful:

- ← Previous: [Blog post anatomy](/know/templates/blog-anatomy)
- → Next: [Tables & comparisons](/know/templates/tables)
