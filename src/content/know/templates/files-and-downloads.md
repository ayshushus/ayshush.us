---
title: Files & downloads · PDFs, slides, datasets
description: Link out to PDFs, decks, CSVs, archives, and other downloadable assets.
date: 2026-05-24
order: 70
tags: [sample, template, files]
---

Any file dropped into the `public/` folder is served from the site root. So
`public/papers/notes.pdf` becomes `/papers/notes.pdf`. Link to those paths like
any other URL.

## PDFs

- 📄 [Read the design doc (PDF)](/papers/design-doc.pdf)
- 📄 [Annotated paper (PDF)](https://arxiv.org/pdf/1706.03762) — external PDFs work too.

The `download` attribute forces a save dialog instead of opening in-browser:

<p>
  <a href="/papers/design-doc.pdf" download>⬇ Download the design doc (PDF)</a>
</p>

> **Tip:** this site also has a built-in PDF mode — a subsection whose
> `_config.md` sets `rules: { pdfOnNumericName: true }` will serve numerically
> named entries (e.g. `1.md`) straight from `/pdfs/<section>/<sub>/1.pdf`. Use
> that when a whole project is really just a stack of PDFs.

## Slide decks

- 🖥 [Slides (PDF export)](/decks/talk-2026.pdf)
- 🖥 [Live deck on Google Slides](https://docs.google.com/presentation/d/EXAMPLE/edit)

## Datasets & spreadsheets

- 📊 [results.csv](/data/results.csv) — raw data behind the charts.
- 📊 [View in Google Sheets](https://docs.google.com/spreadsheets/d/EXAMPLE/edit)

## Archives & misc

- 🗜 [starter-project.zip](/downloads/starter-project.zip)
- 🧩 [VS Code settings (JSON)](/configs/settings.json)

## A download table

Group related assets so readers can grab what they need:

| File | Format | Size | Link |
| --- | --- | --- | --- |
| Design doc | PDF | 1.2 MB | [Download](/papers/design-doc.pdf) |
| Slides | PDF | 4.8 MB | [Download](/decks/talk-2026.pdf) |
| Dataset | CSV | 320 KB | [Download](/data/results.csv) |
