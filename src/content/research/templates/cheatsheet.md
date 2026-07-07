---
title: Cheatsheet · dense quick reference
description: A compact lookup-table layout for commands, shortcuts, and snippets.
date: 2026-05-12
order: 10
tags: [sample, template, reference]
---

Cheatsheets optimize for scanning, not reading. Keep prose to a minimum and lean
on tables and short code blocks, grouped by task.

## Git

| Task                       | Command                                |
| -------------------------- | -------------------------------------- |
| Discard local changes      | `git checkout -- <file>`               |
| Amend last commit          | `git commit --amend`                   |
| Undo last commit, keep work| `git reset --soft HEAD~1`              |
| See what changed           | `git diff --stat`                      |

## Keyboard shortcuts

| Action          | macOS         | Windows/Linux  |
| --------------- | ------------- | -------------- |
| Command palette | `⌘` `⇧` `P`   | `Ctrl` `⇧` `P` |
| Quick open      | `⌘` `P`       | `Ctrl` `P`     |
| Toggle terminal | `` ⌃` ``      | `` Ctrl` ``    |

## Snippets

One-liners worth memorizing:

```bash
# Find the biggest files in a tree
du -ah . | sort -rh | head -20

# Watch a command refresh every 2s
watch -n 2 'kubectl get pods'
```

```ts
// Debounce
const debounce = (fn: Function, ms = 300) => {
  let t: ReturnType<typeof setTimeout>;
  return (...a: unknown[]) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
};
```

> **Layout tip:** cheatsheets work best with short rows. If a cell needs a
> paragraph, it belongs in a [tutorial](/know/templates/tutorial) instead.
