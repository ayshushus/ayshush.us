---
title: Binary search beyond sorted arrays
description: Searching the answer space when a monotonic predicate is all you have.
date: 2026-01-20
tags: [binary-search, monotonic-predicate, optimization, search]
---

Binary search is not really about sorted arrays. It is about **monotonic predicates**. The moment a yes/no question flips exactly once across a range, you can find the boundary in logarithmic time, even when there is no array in sight.

## The real requirement

Forget "sorted." What binary search actually needs is a predicate `p(x)` that is monotonic over the search range: once it becomes true, it stays true.

```text
x:     1   2   3   4   5   6   7
p(x):  F   F   F   T   T   T   T
                   ^ first true — this is what we find
```

> If `p` is monotonic on `[lo, hi]`, the first `x` with `p(x) == true` is found in O(log(hi − lo)) evaluations of `p`.

A sorted array is just one instance: "is `arr[x] >= target`?" is monotonic. But `p` can be any test.

## The canonical template

Search for the leftmost `true`. This boundary-finding form sidesteps the off-by-one bugs that plague the "found it / return mid" variant.

```python
def first_true(lo, hi, p):
    # invariant: answer lies in [lo, hi]
    while lo < hi:
        mid = lo + (hi - lo) // 2     # avoids overflow in fixed-width ints
        if p(mid):
            hi = mid                  # mid might be the answer; keep it
        else:
            lo = mid + 1              # mid is not; discard it
    return lo
```

The loop maintains a single invariant: the boundary is always within `[lo, hi]`. When `lo == hi` the range has collapsed onto it.

## Searching the answer space

The powerful move is to binary-search the *answer itself* when checking a candidate is easier than computing the optimum directly.

**Example: minimum capacity to ship packages in D days.** Weights must ship in order; pick the smallest daily capacity that finishes within `D` days. Higher capacity is always feasible if a lower one was, so feasibility is monotonic.

```python
def ship_within_days(weights, D):
    def feasible(cap):
        days, load = 1, 0
        for w in weights:
            if load + w > cap:
                days += 1
                load = 0
            load += w
        return days <= D

    lo, hi = max(weights), sum(weights)   # bounds on the answer
    return first_true(lo, hi, feasible)
```

The candidate capacity is never indexed into an array; we binary-search the numeric range of possible answers and call `feasible` as the predicate. Total cost: O(n · log(sum)).

## Floating-point variants

For continuous domains (e.g. "smallest radius covering all points"), replace the integer loop with a fixed iteration count or an epsilon threshold:

```python
def first_true_real(lo, hi, p, iters=100):
    for _ in range(iters):
        mid = (lo + hi) / 2
        if p(mid):
            hi = mid
        else:
            lo = mid
    return lo
```

A hundred halvings shrink the interval by a factor of 2^100, far past double precision.

## Where it shows up

| Problem shape | Predicate `p(x)` |
| :--- | :--- |
| Min capacity / max throughput | "can we do it with x?" |
| `sqrt`, nth root | "is x² ≥ target?" |
| Kth smallest in sorted matrix | "are ≥ k elements ≤ x?" |
| Allocation / partition minimization | "can we split under limit x?" |

The art is spotting the monotonic predicate. If you can phrase the problem as "the smallest/largest `x` such that something holds," and feasibility never reverses, binary search applies.

## Wrap up

- Binary search needs a monotonic predicate, not a sorted array.
- The leftmost-true template with a stated invariant kills off-by-one bugs.
- "Search the answer space" turns hard optimizations into easy feasibility checks at a log-factor cost.
