---
title: Raft consensus
description: Leader election, log replication, and why it reads like a state machine instead of a riddle.
date: 2025-09-12
tags: [distributed-systems, consensus, raft, replication]
---

Raft is a consensus algorithm for keeping a replicated log identical across a cluster of machines, even when some of them crash or lag. Its whole design goal was *understandability*: take the guarantees of Paxos and arrange them so a human can hold the protocol in their head.

## The problem it solves

You have an odd number of servers (say 5) and you want them to agree on an ordered sequence of commands — the *log*. Apply that log to a deterministic state machine on each node and every replica ends up in the same state. The hard part is doing this while nodes fail and messages get delayed, dropped, or reordered.

> Safety invariant: if two logs contain an entry with the same index *and* the same term, the entries are identical and so are all entries before them.

## Three roles, one timer

At any moment each server is a **leader**, a **follower**, or a **candidate**. Time is divided into *terms*, monotonically increasing integers that act as a logical clock.

```text
follower --(election timeout)--> candidate --(majority votes)--> leader
   ^                                  |                              |
   |  (discovers higher term, or      |  (sees another leader /      |
   +--  valid leader heartbeat)  <----+----  higher term)  <---------+
```

Followers expect periodic heartbeats. If one hears nothing for a randomized timeout (e.g. 150–300 ms), it bumps the term, becomes a candidate, votes for itself, and requests votes from peers.

## Leader election

A candidate wins by collecting votes from a **majority** of the cluster. Two rules keep this sane:

- A server grants at most **one vote per term**, first come first served.
- A server only votes for a candidate whose log is *at least as up to date* as its own (compared by last log term, then last log index).

Randomized timeouts make split votes rare — when one happens, terms advance and everyone retries with fresh, staggered timers until a single winner emerges.

| Mechanism            | Guarantee it provides                       |
| :------------------- | :------------------------------------------ |
| One vote per term    | At most one leader per term                 |
| Up-to-date log check | Leader holds all committed entries          |
| Majority quorum      | Any two majorities overlap in ≥1 node       |

## Log replication

The leader takes client commands, appends them locally, then sends `AppendEntries` RPCs to followers.

```text
leader log:   [1:x] [1:y] [2:z] [3:w]
                                  ^ leader appends, replicates to followers
                                  ^ once a MAJORITY store index 4, it's COMMITTED
```

Each `AppendEntries` carries the index and term of the entry immediately preceding the new ones. A follower rejects the request if that preceding entry doesn't match — this is the **Log Matching Property**. On rejection the leader decrements its `nextIndex` for that follower and retries, walking backward until the logs converge, then overwrites any conflicting tail.

An entry is *committed* once it's stored on a majority. Crucially, a leader only commits entries **from its own term** directly; older entries get committed indirectly once a current-term entry above them commits. This subtlety closes a real safety hole where a committed entry could otherwise be overwritten.

## Why it beats Paxos for humans

Multi-Paxos describes *what* must hold but leaves leadership, log structure, and membership changes as exercises. Raft makes deliberate choices — a strong leader, append-only logs that flow leader→follower, and election restrictions — that collapse the state space you have to reason about. Same safety, far fewer corner cases to mentally simulate.

## Wrap up

- Terms + randomized timeouts + one-vote-per-term yield a single leader without a clock.
- Committing requires a majority; majorities always overlap, so no two conflicting values commit.
- The leader-only, append-only log is what makes Raft tractable to implement and audit compared to bare Paxos.
