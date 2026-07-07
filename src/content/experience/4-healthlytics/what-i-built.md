---
title: What I built at Healthlytics
description: A project I shipped at Healthlytics and what changed once it landed.
date: 2024-05-20
tags: [project, shipped, software-engineering, healthlytics]
---

[template]

The work at Healthlytics I am proudest of was a feature in the analytics product. Here is the problem it solved, how I approached it and what changed once it shipped.

## The problem

The product surfaced health data, but a part of that workflow was slow and easy to get wrong, so people did not trust what they saw.

- Who it affected: the users relying on the analytics
- Why it mattered: bad or slow numbers meant decisions got delayed
- Why it was hard: the data was sensitive and had to stay correct end to end

## My approach

I built the feature and the code behind it. The shape of it:

- **Design:** kept the data flow simple so it was easy to reason about and check.
- **Stack:** a web front end with a data layer behind it.
- **Tradeoffs:** favoured correctness over cleverness, since the numbers had to hold up.

## What I shipped

| Piece | What it does | Status |
| --- | --- | --- |
| the feature UI | surfaces the analytics to users | shipped |
| the data path | moves data between the app and its store | shipped |
| checks | catches bad data before it is shown | iterated |

## Impact

Once it landed, people trusted the output more and spent less time second-guessing it. The workflow that used to stall stopped being a blocker.

## What I learned

In health data, correctness is not a nice-to-have, it is the whole point. The lesson I took away was to design for that first and worry about polish later.
