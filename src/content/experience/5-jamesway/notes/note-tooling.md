---
title: "Note: tooling setup"
description: Tooling and workflow notes from Jamesway.
date: 2023-08-09
tags: [note, tooling, jamesway]
---

[template]

**Tool:** a mock version of the incubator hardware.

**Why we used it:** testing against real machines was slow and tied up equipment other people needed.

**Gotcha:** the mock did not reproduce the machines resending values, so some bugs only showed up in production. Add that behaviour to the mock before trusting it.
