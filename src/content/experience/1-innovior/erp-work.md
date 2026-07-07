---
title: The ERP MVP I built at INNOVIOR
description: A deeper look at the full-stack MVP I built to present edge data storage to executives.
date: 2023-09-05
tags: [erp, integration, data-migration, case-study]
order: 0
---

Beyond day-to-day consultancy, I owned the build of a full-stack MVP on the ERP side at INNOVIOR Africa Group. This entry walks through that piece of work end to end.

## The problem

The company needed a way to show C-suite executives how a database management system could sit behind their ERP products, with data handled closer to where it is generated. Slides only go so far. Leadership wanted something they could see running before committing to the wider direction.

The goal was to build a working MVP that demonstrated edge data storage and propagation.

## The approach

I built the application as a full-stack web app and tackled it in stages:

- **Discovery:** mapped what the executives needed to see and agreed on the scope with the team.
- **Build:** implemented the front end and back end, wiring the interface to a relational database and an edge storage layer.
- **Validation:** tested the data flow and walked through the demo with the team before presenting it.

Key technical decisions:

| Decision | Why |
|----------|-----|
| Edge data storage | Keep data close to where it is produced and cut round trips |
| Full-stack MVP over slides | Give executives something concrete to react to |
| Relational database backing | Fit the ERP data model the products already used |

## The impact

Once it was ready:

- Executives had a running demo instead of a static pitch, which made the edge direction easier to discuss.
- The prototype showed the storage and propagation model working end to end.

## Takeaway

ERP work is less about flashy features and more about trustworthy data and reliable plumbing. The MVP mattered because it turned an abstract idea into something leadership could actually try.
