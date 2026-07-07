---
title: "Note: things to remember"
description: Small reminders I kept for Jamesway's systems.
date: 2023-08-22
tags: [note, reference, jamesway]
---

[template]

- The machine config lives in the service repo, not with the hardware.
- The deploy command has to run from the service directory or it picks up the wrong environment.
- Readings are deduplicated on timestamp, so a clock drift on a machine will look like missing data.
