---
title: Consistent hashing
description: Mapping keys to nodes so that adding or removing a machine reshuffles a fraction, not everything.
date: 2026-01-22
tags: [distributed-systems, sharding, caching, hashing, partitioning]
---

The naive way to spread keys across N servers is `hash(key) % N`. It works until N changes. Then almost every key remaps and your cache or shard cluster melts down. Consistent hashing fixes exactly this.

## The modulo problem

```text
N = 4:  hash(key) % 4  ->  key "user:42" lands on node 2
N = 5:  hash(key) % 5  ->  key "user:42" lands on node 0
```

Changing the divisor changes nearly *every* result. For a 4→5 node move, roughly 4/5 of all keys relocate. In a cache that's a stampede of misses; in a sharded store it's a massive data migration.

## The ring

Consistent hashing maps both keys and nodes onto the same circular space, say a 32-bit ring from `0` to `2^32 - 1`. A key is owned by the first node found walking clockwise from the key's position.

```text
        0/2^32
          |
   nodeC  *           * nodeA
          |          /
   -------+---------*---  key "user:42"  -> walks CW -> owned by nodeA
          |
   nodeB  *
```

> Locality invariant: a key's owner only changes when a node is added or removed *in the arc immediately preceding that key*. Everything else stays put.

Add a node and it slots into one spot on the ring, stealing keys only from its clockwise successor. Remove a node and its keys fall to the next node clockwise. On average only **K/N** keys move when you add or remove one of N nodes holding K keys, instead of nearly all of them.

| Scheme              | Keys moved when N → N+1        |
| :------------------ | :---------------------------- |
| `hash(key) % N`     | ~all keys                     |
| Consistent hashing  | ~K/N keys                     |

## Virtual nodes

A plain ring has a flaw: with few nodes, their random positions leave uneven gaps, so load is lopsided. And when a node dies, *all* its load dumps onto a single successor.

The fix is **virtual nodes** (vnodes): each physical node is hashed onto the ring many times under labels like `nodeA#0 ... nodeA#199`.

```go
// place each physical node at V points on the ring
for i := 0; i < V; i++ {
    h := hash(fmt.Sprintf("%s#%d", node, i))
    ring[h] = node
}
sortKeys(ring) // keep positions sorted for binary search on lookup
```

With ~100-200 vnodes per server, the ring approximates a uniform distribution, so load variance drops sharply. Better still, when one physical node leaves, its many small arcs spread across *many* successors rather than crushing one. Weighting is free too: give a beefier machine more vnodes to hand it a larger share.

## Lookups

Store the ring as a sorted array of hash positions. A lookup is a binary search for the first position `>= hash(key)`, wrapping to index 0 if you run off the end, at `O(log V·N)`.

## Where it shows up

- **Caches**: memcached client libraries and CDNs use it so a node failure invalidates only its slice, not the whole cache.
- **Datastores**: Amazon Dynamo, Cassandra and Riak partition data over a consistent-hash ring; the next R nodes clockwise hold replicas.
- **Load balancers**: consistent hashing with bounded loads pins clients to backends with minimal churn during scale events.

A common refinement is **bounded-load consistent hashing**, which caps any node at a small factor over the average and spills overflow to the next node, combining ring locality with a hard fairness guarantee.

## Wrap up

- Replace `% N` with a ring so scale events move ~K/N keys instead of nearly all of them.
- Virtual nodes smooth load distribution and spread a failed node's keys across many survivors.
- It's the backbone of distributed caches and partitioned datastores; bounded-load variants add fairness on top.
