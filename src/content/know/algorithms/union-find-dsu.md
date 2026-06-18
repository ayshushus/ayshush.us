---
title: Union-Find · the near-O(1) set merger
description: Path compression and union by rank, and why the amortized cost is almost constant.
date: 2025-03-14
tags: [union-find, dsu, amortized-analysis, graphs]
---

A disjoint-set union (DSU) answers two questions blazingly fast: *are these two elements in the same group?* and *merge their groups.* It is the quiet workhorse behind Kruskal's MST, connected-components, and cycle detection.

## The structure

Each element points at a parent. Following parents until you reach a self-loop gives the **representative** of the set. Two elements share a set exactly when they share a representative.

```python
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))   # everyone is their own root
        self.rank = [0] * n            # upper bound on tree height
```

The naive `find` walks to the root, and `union` re-points one root at the other. Left unoptimized, trees degenerate into linked lists and operations cost O(n). Two refinements fix this.

## Path compression

While finding the root, flatten the path so every node visited points straight at the root. Future lookups on those nodes are then O(1).

```python
def find(self, x):
    root = x
    while self.parent[root] != root:
        root = self.parent[root]
    while self.parent[x] != root:      # second pass flattens
        self.parent[x], x = root, self.parent[x]
    return root
```

## Union by rank

When merging, hang the shorter tree under the taller one so height grows as slowly as possible. `rank` tracks an upper bound on height; it only increments when two equal-rank trees merge.

```python
def union(self, a, b):
    ra, rb = self.find(a), self.find(b)
    if ra == rb:
        return False                   # already joined; no-op
    if self.rank[ra] < self.rank[rb]:
        ra, rb = rb, ra
    self.parent[rb] = ra
    if self.rank[ra] == self.rank[rb]:
        self.rank[ra] += 1
    return True
```

## Why it's almost constant

> With both path compression and union by rank, a sequence of *m* operations on *n* elements runs in **O(m · α(n))**, where α is the inverse Ackermann function.

α(n) grows so absurdly slowly that for any conceivable input — atoms in the universe included — it is at most 4. So each operation is effectively constant. Use just one optimization and you get O(log n) amortized; use rank-by-size instead of rank-by-height for an equivalent bound.

| Variant | Amortized per op |
| :--- | :--- |
| Naive | O(n) |
| Path compression only | O(log n) |
| Union by rank only | O(log n) |
| Both | O(α(n)) ≈ O(1) |

## When to reach for it

Reach for DSU whenever you are incrementally **merging** equivalence classes and never need to split them:

- Kruskal's MST — `union` edges in weight order, skip any that would form a cycle.
- Connected components in a static or growing graph.
- "Number of islands"-style grid flooding without recursion.
- Detecting cycles in an undirected graph: a cycle exists the first time `union` returns `False`.

The one thing DSU cannot do cheaply is *delete* an edge or split a set — those need link-cut trees or offline tricks.

## Wrap up

- Two ideas — path compression and union by rank — collapse the cost from O(n) to inverse-Ackermann amortized.
- It models monotonically growing equivalence classes; it does not support splits.
- The go-to tool for MST, cycle detection, and connected components.
