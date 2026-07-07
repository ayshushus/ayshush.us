---
title: Lessons from Jamesway
description: The things I would carry forward from my time at Jamesway.
date: 2023-10-04
tags: [reflection, software-engineering, jamesway]
---

[template]

Looking back, a few things stuck with me from Jamesway, technical and otherwise.

## What worked

- Keeping the collector and the view separate paid off, because I could change one without touching the other.
- Talking to the operators early meant I built the thing they actually wanted.

## What I would do differently

- I would write the mock hardware sooner. I spent too long testing against real machines before I had a fake one.

## The takeaway

The biggest thing was that software near hardware has to expect the hardware to fail. I still design for that now, well before I write the happy path.
