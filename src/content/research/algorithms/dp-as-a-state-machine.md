---
title: Dynamic programming as a state machine
description: State, transition, base case — and the choice between top-down and bottom-up.
date: 2025-06-02
tags: [dynamic-programming, memoization, recursion, state-machine]
---

Dynamic programming intimidates because people memorize recurrences instead of deriving them. Treat DP as a state machine and the recurrence falls out almost mechanically: define the *state*, the *transitions* between states, and the *base case* where recursion bottoms out.

## The three questions

Every DP problem reduces to answering these:

1. **State** — what is the minimal set of variables that fully describes a subproblem? This is your function's signature.
2. **Transition** — how is one state's answer built from smaller states? This is the recurrence.
3. **Base case** — which states have an answer with no further recursion?

> If two different paths to a state always yield the same answer, the problem has *optimal substructure* and *overlapping subproblems* — the two conditions DP exploits.

## A worked example

Consider the classic coin-change: fewest coins summing to `amount`, given denominations.

- **State:** `dp[a]` = fewest coins to make amount `a`.
- **Transition:** `dp[a] = 1 + min(dp[a - c])` over every coin `c ≤ a`.
- **Base case:** `dp[0] = 0`; unreachable amounts are ∞.

The state is one integer, so there are `amount + 1` states, and each tries every coin — O(amount · |coins|) time, O(amount) space.

## Top-down: memoized recursion

Write the recurrence literally, cache results. You only ever compute the states you actually need.

```python
from functools import lru_cache

def coin_change(coins, amount):
    @lru_cache(maxsize=None)
    def dp(a):
        if a == 0:
            return 0
        if a < 0:
            return float("inf")
        return min((1 + dp(a - c) for c in coins), default=float("inf"))
    res = dp(amount)
    return res if res != float("inf") else -1
```

## Bottom-up: fill a table

Order states so dependencies are computed first, then iterate. No recursion stack, often easier to optimize for space.

```python
def coin_change(coins, amount):
    INF = amount + 1
    dp = [0] + [INF] * amount
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a:
                dp[a] = min(dp[a], 1 + dp[a - c])
    return dp[amount] if dp[amount] <= amount else -1
```

## Choosing a direction

| | Top-down | Bottom-up |
| :--- | :--- | :--- |
| Visits | only reachable states | all states |
| Stack | recursion (can overflow) | iterative |
| Space tricks | harder | rolling arrays, etc. |
| Readability | mirrors the recurrence | needs an explicit order |

Start top-down to validate the recurrence, then convert to bottom-up if you need to shave the recursion stack or compress the table — for example, when `dp[a]` depends only on the previous row you can keep a single rolling array and drop a dimension of space.

## A useful sanity check

Count the states and the work per transition. Their product is your time complexity. If it is exponential, your state is too coarse — you're recomputing because the state fails to capture something the transition depends on (a common bug in knapsack-style problems that forget to index by remaining capacity).

## Wrap up

- Derive the recurrence from state, transition, and base case rather than memorizing it.
- Top-down validates the logic; bottom-up enables iteration and space compression.
- Time ≈ (number of states) × (work per transition) — a quick correctness and complexity check.
