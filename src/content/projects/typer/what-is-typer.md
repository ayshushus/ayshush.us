---
title: What Typer is
description: A short overview of what Typer does and who might want it.
date: 2024-10-02
tags: [typer, overview, intro]
---

[template]

This writeup is a placeholder. Typer is one of my side projects and the details below are invented while I write up the real story. Typer is a small tool I built to make a task I do often less tedious.

## The problem

Before Typer I was repeating the same steps by hand, over and over. It worked, but it was slow and easy to get wrong on a bad day.

The friction showed up as:

- Manual repetition of something that never really changed
- Tools that solved part of the job but left the annoying half to me

## What it actually does

Typer takes the repetitive work and does it for you. You give it a bit of input, and it hands back the result you were going to type out anyway.

The main features:

| Feature | What it gives you |
| :--- | :--- |
| Automation | The repeated steps happen on their own |
| Simple input | You describe what you want in a compact form |
| Fast output | The result comes back quickly |

## Who it's for

Typer is mostly for people who hit the same repetitive task I did. If that sounds familiar, it might help. If your work is more varied, it probably will not fit, and that is fine.

A rough sense of the shape of it:

```ts
const result = typer.run(input)
```

## Why it exists at all

Other tools get close. Typer is different because I made one opinionated choice about how it should behave and stuck with it. That choice cost me some flexibility, but it is the part I would defend.

Where it stands today: still a personal project that I keep coming back to.
