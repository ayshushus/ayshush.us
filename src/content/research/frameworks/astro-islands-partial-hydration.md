---
title: Astro islands and partial hydration
description: Zero-JS by default, the client:* directives, and deciding when to ship interactivity.
date: 2025-04-22
tags: [astro, islands, hydration, performance, ssr]
---

Astro's headline trick is shipping no JavaScript unless you ask for it. Components render to HTML on the server, and only the interactive bits — the "islands" — get hydrated in the browser. This note covers the model, the directives that control it, and how to decide what actually needs to run client-side.

## Server-first rendering

By default, an Astro component is evaluated once at build time (or per request in SSR mode) and emitted as plain HTML. The component code never reaches the browser. A page full of `.astro` components ships a `<head>`, some markup, and zero runtime — not even a framework bundle.

```astro
---
// runs on the server only; no JS sent to the client
const posts = await getCollection("know");
---
<ul>
  {posts.map((p) => <li>{p.data.title}</li>)}
</ul>
```

> The default cost of an Astro page is the HTML itself. Interactivity is opt-in, paid for one island at a time.

## Islands and the client:* directives

When you do need interactivity, you embed a UI-framework component (React, Vue, Svelte, Solid, Preact) and tag it with a `client:*` directive. Astro renders the component's initial HTML on the server, then ships just that component's JS to hydrate it in place. The rest of the page stays static.

```astro
---
import Counter from "../components/Counter.jsx";
---
<Counter client:visible />
```

The directive decides *when* hydration happens, which is the whole performance lever:

| Directive | When it hydrates | Use for |
| :--- | :--- | :--- |
| `client:load` | immediately on page load | above-the-fold, critical widgets |
| `client:idle` | when the main thread is idle | important but not urgent |
| `client:visible` | when scrolled into viewport | below-the-fold components |
| `client:media` | when a media query matches | mobile-only or desktop-only UI |
| `client:only` | client only, skips SSR | components that touch `window` |

`client:only` is the exception: it ships no server HTML, so you must name the framework (`client:only="react"`) since Astro can't infer it without rendering.

## Islands are isolated

Each island hydrates independently and in parallel. A slow `client:load` chart does not block a `client:visible` form further down the page. They also don't share a runtime context by default — two React islands are two separate React roots, not one tree.

That isolation is the trade-off. To share state across islands you reach for framework-agnostic tools like nano stores, or you lift the state into the URL or `localStorage`.

```astro
<!-- two independent roots, hydrated on their own schedules -->
<SearchBox client:idle />
<Cart client:load />
```

## When to ship interactivity

The discipline is to treat every `client:*` as a deliberate cost. Most "interactive-looking" UI — accordions, tabs, dropdowns — can be done with HTML, CSS, and a few lines of inline `<script>` without hydrating a framework at all.

Reach for an island when the component owns genuine client state that has to survive across events: a live search, a stateful form, a canvas/chart, a media player. For everything static, let it render to HTML and ship nothing.

## Wrap up

- Astro renders to HTML by default; JavaScript is opt-in per component, not per page.
- `client:*` directives control *when* an island hydrates — match the directive to the component's urgency and position.
- Islands are isolated roots; prefer plain HTML/CSS for non-stateful UI and reserve hydration for real client state.
