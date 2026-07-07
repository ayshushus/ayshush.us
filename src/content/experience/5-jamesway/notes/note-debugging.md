---
title: "Note: debugging a tricky reading bug"
description: A short note on a bug that took longer than it should have.
date: 2023-07-11
tags: [note, debugging, jamesway]
---

[template]

**Symptom:** the dashboard showed occasional spikes that the machines were not actually producing.

**Cause:** the collector was counting a duplicate reading as a new one whenever the hardware resent a value.

**Fix:** I deduplicated on the reading timestamp before storing anything.

**Lesson:** when data looks wrong, suspect the ingestion path before the display. That is where the noise usually enters.
