---
title: What I built · Grant Thornton
description: The projects I shipped and the outcomes I delivered at Grant Thornton.
date: 2024-02-20
tags: [grant-thornton, projects, shipping]
---

[template]

This entry focuses on the work I shipped at Grant Thornton and why it mattered.

## Project one: data models over large datasets

**The problem.** The practice had datasets that were too big and too raw to model directly, and the analysis on top of them was slow to trust.

**What I built.** A pipeline that cleaned and represented the data, then fed it into mathematical models and neural networks. I owned the data preparation and the model plumbing.

**Approach.** I started with the data itself, working out how to represent it in a form the models could use. Then I built the modelling steps in Python and tested them against real datasets. The hardest part was performance, which I handled by rethinking how the data was queried and stored.

**Impact.** The models ran on the full dataset rather than a sample, so the analysis leaned on more of the real picture.

## Project two: scaling the database work

| | |
| --- | --- |
| Problem | queries slowed down badly as row counts grew |
| My role | reworking how the data was stored and read |
| Stack | SQL and Python |
| Outcome | the work stayed usable at millions of rows |

A short version: as the data grew, the naive approach stopped holding up, so I reworked the storage and access patterns until it stayed fast. The piece I am proudest of was catching the problem before it reached the people relying on the numbers.

## How I worked

- Paired with data and consulting colleagues to agree on what the output needed to show.
- Shipped in short cycles with regular reviews.
- Judged success by whether the work held up at full scale.

## What I'd do differently

Looking back, I would spend more time on the data representation up front, since most of the later pain traced back to decisions made early. The habit I would keep is testing against real volumes, not small samples.
