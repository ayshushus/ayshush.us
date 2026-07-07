---
title: Role overview · UofT Engineering
description: A research software role turning handwritten documents into structured formats.
date: 2025-09-15
tags: [role, overview, research, ocr]
---

A map of my research software role at the University of Toronto's engineering faculty. What the work was, who it was for and where I spent my time.

## The role

I worked as a software engineer on a part-time contract from September 2025 to April 2026. It was hybrid, so I split time between campus and home in Toronto. The role sat inside an academic research group, which meant the goal was a working system, not a shipped product.

In one line: I built document intelligence pipelines that turned high volumes of documents into very specific structured formats.

## The problem space

Researchers had piles of documents that were only useful once a human read and retyped them. Handwritten sheets, scanned pages and academic material all had to become something a computer could search and process. Doing that by hand does not scale past a few hundred pages.

## Scope

| Area | What I did |
| --- | --- |
| Document parsing | Read 100K+ handwritten A4 and A3 sheets into structured layout |
| OCR | Trained and fine-tuned OCR models on the group's material |
| Reconstruction | Turned 50K+ academic pages into LaTeX |
| Tech stack | Python |

## The hard part

The most demanding piece was fine-tuning the OCR models. Off-the-shelf OCR does fine on clean printed text and falls apart on handwriting and dense academic layout. Getting it to hold up meant applying machine learning and deep learning to the group's own data rather than trusting a generic model.

## Why it mattered

Once the pipeline worked, a stack of documents that used to take weeks of retyping became something the group could process in a run. That is the whole point of research tooling. It gives the people around you their time back.
