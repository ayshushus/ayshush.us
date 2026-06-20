---
title: Code blocks · every flavor
description: Syntax-highlighted code in any language, inline code, shell, diffs, and config.
date: 2026-05-28
order: 90
tags: [sample, template, code]
---

Fenced code blocks are highlighted with Shiki using the site's CSS-variable
theme, so they automatically match light/dark mode. Put the language right after
the opening ` ``` ` to turn highlighting on.

## Inline code

Use single backticks for `variables`, `flags --like-this`, file names like
`astro.config.mjs`, or short expressions like `x ?? y`.

## A typed example

```ts
type User = { id: string; name: string };

async function loadUser(id: string): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error(`failed: ${res.status}`);
  return res.json() as Promise<User>;
}
```

## Python

```python
from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float

    def dist(self, other: "Point") -> float:
        return ((self.x - other.x) ** 2 + (self.y - other.y) ** 2) ** 0.5
```

## Shell / terminal

```bash
# Commands and their output read well in a bash block.
npm install
npm run dev
# → Local: http://localhost:4321
```

## A diff

Diff highlighting is handy in "here's the fix" posts:

```diff
- const timeout = 1000;
+ const timeout = 5000; // bumped: slow CI runners were flaking
```

## Config / data

```json
{
  "name": "example",
  "scripts": { "dev": "astro dev" },
  "version": "1.0.0"
}
```

```yaml
# YAML, TOML, SQL, rust, go, etc. all work — just name the language.
service: web
replicas: 3
ports:
  - 8080
```

```sql
SELECT user_id, COUNT(*) AS events
FROM analytics
WHERE day >= '2026-01-01'
GROUP BY user_id
ORDER BY events DESC
LIMIT 10;
```
