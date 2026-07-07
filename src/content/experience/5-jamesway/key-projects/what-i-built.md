---
title: What I built at Jamesway
description: The main project I shipped, framed as the problem, the approach and the outcome.
date: 2023-09-21
tags: [project, shipped, software-engineering, jamesway]
---

[template]

Here is the work I am proudest of from Jamesway, told as problem, approach and outcome.

## The problem

When I started, the readings coming off the incubators were hard for anyone but an engineer to make sense of. That mattered because the people watching the machines were operators, not programmers.

Getting a clear picture of a running batch meant reading raw values by hand, which was slow and easy to get wrong.

## What I built

The main project was a service that collected machine readings and presented them in a form the operations team could use.

Key pieces:

- A collector that pulled state off the machines on a schedule.
- A small store that kept recent readings so trends were visible.
- A view layer that turned those readings into something readable.

## The approach

- Design: I kept the collector separate from the view so either could change without breaking the other.
- Stack: mostly TypeScript on the service side with a lightweight datastore behind it.
- Hard part: the machines did not report state consistently, so the collector had to tolerate gaps and duplicates.
- Collaboration: I worked closely with the operations team on what they actually needed to see.

## Before and after

| Dimension | Before | After |
| --- | --- | --- |
| Reading machine state | manual, by hand | on a live view |
| Spotting a bad batch | slow | much faster |
| Who could do it | engineers only | operators too |

## Impact

- Operators could check a batch without pulling in an engineer.
- Problems showed up sooner because trends were visible.
- The service ran in front of the real machines by the end of my term.

## What I learned

Software that talks to hardware has to assume the hardware will misbehave. Designing for that from the start saved me a lot of rework later.
