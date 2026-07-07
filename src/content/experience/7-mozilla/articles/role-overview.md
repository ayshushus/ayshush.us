---
title: Joining Mozilla
description: My role on the team behind Pontoon, Mozilla's localization platform.
date: 2026-05-13
tags: [mozilla, pontoon, localization, role-overview]
---

Mozilla ships Firefox in dozens of languages. Almost none of that happens on its own. Behind every translated button and onboarding string is a long chain of translators and reviewers working through tooling built for the job. I work on that tooling.

## How I got here

I joined Mozilla in May 2026 as a software engineer on a co-op term. I work remotely from Toronto with the Firefox localization team. My focus is the machine learning side of the work, so most of my days go into natural language processing applied to real translation strings.

## What Pontoon is

[Pontoon](https://pontoon.mozilla.org/) is Mozilla's open source localization platform. Staff and a large volunteer community use it to translate Mozilla products and websites into many locales. It keeps track of a few core things:

- **Strings** are the source text that needs translating.
- **Locales** are the target languages and the teams behind them.
- **Translation memory** reuses past translations so wording stays consistent.
- **Review workflows** cover approving suggestions and talking through the tricky ones.

## My scope

I sit on the applied ML side of the platform. The main project is a localization autocomplete prototype that suggests the next part of a translation while someone types. To get there I have been evaluating more than five million strings and benchmarking a few model families against each other.

| Area | What I do | Status |
| --- | --- | --- |
| String evaluation | Score and clean 5M+ strings for training and analysis | Ongoing |
| Autocomplete models | Benchmark transformers, autoencoders and LSTMs | Prototype |
| Applied research | Turn probabilistic reasoning into workflow gains for translators | Ongoing |

## How the team works

The work happens in the open on GitHub. Most of the platform is built and reviewed in public, so decisions have to weigh what staff need against how the volunteer community actually works day to day. That community is large. A change that annoys contributors is a change worth rethinking.

## Beyond the platform

The autocomplete research is written up in more detail elsewhere on this site. Those notes walk through the input representations and model choices I tested, from n-gram baselines up to transformers.

The short version of the role: I help Firefox speak more languages without slowing down the people doing the translating.
