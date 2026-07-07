---
title: React Server Components, the mental model
description: The server/client boundary, what serializes across it and where state can live.
date: 2025-09-08
tags: [react, rsc, server-components, nextjs, rendering]
---

React Server Components (RSC) let some components run only on the server and never ship their code to the browser. The hard part isn't the syntax. It's internalizing the boundary between server and client, and what's allowed to cross it.

## Server is the default

In an RSC-aware framework (Next.js App Router, and others), every component is a Server Component unless it opts out. Server Components run on the server, can be `async` and can touch server-only resources directly (a database or the filesystem) because none of that code is sent to the client.

```tsx
// a Server Component: runs on the server, ships no JS
async function PostList() {
  const posts = await db.posts.findMany(); // direct DB access, fine
  return (
    <ul>
      {posts.map((p) => <li key={p.id}>{p.title}</li>)}
    </ul>
  );
}
```

> A Server Component's job is to produce UI on the server. Its source code, its imports and the data it fetches stay on the server; only the rendered output crosses the wire.

## The "use client" boundary

To get interactivity such as `useState` or event handlers, you mark a file with `"use client"`. That directive defines a boundary: the module and everything it imports becomes part of the client bundle.

```tsx
"use client";
import { useState } from "react";

export function LikeButton() {
  const [liked, setLiked] = useState(false);
  return <button onClick={() => setLiked(!liked)}>{liked ? "♥" : "♡"}</button>;
}
```

The key rule: the boundary is one-directional. A Server Component can *render* a Client Component, but a Client Component cannot *import* a Server Component (it would have to bundle server code). You compose across the boundary by passing Server-rendered UI as `children` or props.

```tsx
// Server Component passes server-rendered UI into a client shell
<ClientTabs>
  <ServerExpensiveChart />  {/* rendered on server, passed as a child */}
</ClientTabs>
```

## What actually serializes

When a Server Component renders a Client Component, the props have to travel from server to client. They must be **serializable**. This is the constraint that trips people up.

| Crosses the boundary | Does not |
| :--- | :--- |
| strings, numbers, booleans | functions / event handlers |
| plain objects, arrays | class instances |
| `Date`, `Map`, `Set` (RSC-supported) | symbols |
| JSX / Server Components as `children` | closures over server state |

You can't pass an `onClick` from a server component into a client one, because functions don't serialize. (Server Actions are the deliberate exception: a function marked `"use server"` is passed by reference and invoked via an RPC, not serialized as code.)

## Where state lives

Because Server Components don't re-render in the browser, they hold no client state and no effects. Anything reactive lives below a `"use client"` boundary. The practical pattern is a static server shell with small interactive client leaves, the inverse of a fully client-rendered app where everything is interactive whether it needs to be or not.

This keeps the client bundle proportional to actual interactivity, and lets data fetching sit right next to the markup that uses it, no API route in between.

## Wrap up

- Components are server-side by default; `"use client"` opts a subtree into the browser bundle.
- The boundary is one-way: server renders client, client receives server output as children, never the reverse import.
- Props crossing the boundary must serialize; functions don't, which is why interactivity (and Server Actions) needs explicit handling.
