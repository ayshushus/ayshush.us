---
title: What I built at UofT Engineering
description: Document intelligence and OCR pipelines for handwritten sheets and academic pages.
date: 2026-03-10
tags: [project, ocr, document-intelligence, research]
---

The clearest way to describe research software is to point at what it processed. Here is the main pipeline I built at UofT.

## The project

Two connected pipelines. One read handwritten sheets and rebuilt their layout. The other took academic pages and rewrote them as LaTeX. Both existed to turn documents into a format a machine could actually work with.

## The problem

The group had documents in the worst possible shape for a computer. Handwriting varies from page to page. Academic pages mix text, math and figures in a layout that ordinary OCR flattens into nonsense. Reading all of it by hand was the bottleneck the whole group ran into.

## The approach

- **Layout reconstruction.** For the handwritten sheets I parsed more than 100,000 A4 and A3 pages and rebuilt their semantic layout, so a heading stayed a heading and a table stayed a table instead of collapsing into a wall of text.
- **OCR training.** Generic OCR could not read the handwriting well, so I trained and fine-tuned models on the group's own pages. This was the part that made the rest possible.
- **Reconstruction to LaTeX.** For the academic material I built a pipeline that processed more than 50,000 pages into LaTeX, math included.

Everything ran in Python.

## What it does

| Piece | What it does |
| --- | --- |
| Layout parser | Rebuilds structure from 100K+ handwritten sheets |
| Fine-tuned OCR | Reads handwriting and dense academic text |
| LaTeX reconstruction | Turns 50K+ pages into editable LaTeX |

## Impact

Work that used to mean weeks of manual retyping became a pipeline run. The researchers could point at a stack of documents and get a structured version back, which freed them to do the actual research.

## What I would do differently

I would build the evaluation harness first. Judging OCR quality by eye is slow and unreliable. A proper accuracy metric per page would have told me which fine-tuning runs were real improvements much sooner.
