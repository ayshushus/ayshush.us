---
title: Onboarding and the codebase
description: How I got up to speed at Jamesway and what the codebase looked like.
date: 2023-06-02
tags: [onboarding, software-engineering, jamesway]
---

[template]

The first weeks were mostly reading. Here is how I ramped up on the Jamesway stack and where the tricky parts turned out to be.

## The stack

The system was a TypeScript service sitting in front of the incubation hardware, backed by a small datastore. On day one I got a local environment running by cloning the repo and pointing it at a mock version of the machines.

## Where things lived

- The collector read state off the machines.
- The view layer turned that state into something operators could read.
- The hardware interface was the part everyone warned me about, because the machines did not always report cleanly.

## First contribution

My first merged change was a small fix to how gaps in the readings were handled. It taught me that the hardware was the source of most surprises, not the code. Reviews went through a single senior engineer who knew the machines well.

## Code walkthrough

I kept notes as I read through the service, and those notes became the map I used for the rest of the term.
