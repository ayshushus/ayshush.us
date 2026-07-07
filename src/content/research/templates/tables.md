---
title: Tables & comparisons
description: Data tables, comparison matrices, pros/cons, and checklists.
date: 2026-05-16
order: 30
tags: [sample, template, tables]
---

Tables are the fastest way to make a comparison scannable. Use colons in the
separator row to control alignment.

## Aligned data table

| Metric          | Baseline | Optimized | Δ        |
| :-------------- | -------: | --------: | :------- |
| p50 latency     |   120 ms |     45 ms | −62%     |
| p99 latency     |   850 ms |    310 ms | −64%     |
| Throughput      |  1.2k/s  |    3.8k/s | +217%    |

(Left and last columns are left-aligned; the number columns are right-aligned.)

## Comparison matrix

| Feature          | Option A | Option B | Option C |
| ---------------- | :------: | :------: | :------: |
| Open source      |    ✅    |    ✅    |    ❌    |
| Self-hostable    |    ✅    |    ❌    |    ✅    |
| Free tier        |    ✅    |    ✅    |    ❌    |
| Best for         |  Hobby   |   Teams  |  Scale   |

## Pros & cons

A two-column table reads cleaner than two bullet lists:

| 👍 Pros                       | 👎 Cons                          |
| ----------------------------- | -------------------------------- |
| Zero config to get started    | Fewer escape hatches             |
| Fast static output            | Build step required              |
| Great docs                    | Smaller ecosystem than React     |

## Checklist

Task-list syntax renders as checkboxes:

- [x] Set up the project
- [x] Write the first post
- [ ] Wire up analytics
- [ ] Ship it
