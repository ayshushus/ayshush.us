---
title: Write-ahead logging
description: How databases survive crashes by writing the intent before the change, and what fsync really costs.
date: 2025-11-03
tags: [databases, durability, wal, crash-recovery, storage]
---

A database promises that once it says "committed," your data survives a power loss. Write-ahead logging (WAL) is the trick that makes that promise cheap enough to keep on every transaction.

## The rule

The name *is* the protocol: write the log record describing a change before you write the change itself to the data pages.

> WAL invariant: a modification to a data page must not reach durable storage until the log record describing that modification is already durable.

This inverts the obvious approach. Instead of carefully updating data files in place and praying the machine doesn't die mid-write, you append a compact record of *intent* to a sequential log, flush that and only then are you free to update the actual pages whenever it's convenient.

## Why a log is faster than the data

Data pages are scattered across the file, and updating them means random I/O. The WAL is a single file you only ever append to, which is sequential I/O. Sequential writes are dramatically faster on both spinning disks (no seeks) and SSDs (friendlier to the FTL), so the durability barrier sits on the cheapest possible write pattern.

```text
TXN: UPDATE accounts SET bal = bal - 100 WHERE id = 7

1. append redo record to WAL buffer
2. fsync the WAL up through this record   <-- durability point
3. acknowledge COMMIT to client
4. ...later... flush dirty data page for id=7 to disk (lazily)
```

## The fsync cost

A `write()` only copies bytes into the OS page cache. Until the kernel flushes them, a power loss loses them. `fsync()` forces those bytes (and the disk's own cache, if `FUA`/barriers are honored) onto stable media. It is the expensive part.

```c
write(wal_fd, record, len);   // cheap: into page cache
fsync(wal_fd);                // costly: blocks until on-disk
// only now is the transaction durable
```

A single `fsync` can take from tens of microseconds (battery-backed cache) to several milliseconds (commodity disk). Since every commit needs one, it caps your commit throughput. The standard mitigation is **group commit**: batch many transactions' log records and pay one `fsync` for all of them.

| Setting              | Behavior                                  | Trade-off                          |
| :------------------- | :---------------------------------------- | :--------------------------------- |
| fsync on every commit| Full durability                           | Latency bound by disk fsync        |
| Group commit         | One fsync per batch                       | Slight latency, big throughput win |
| Relaxed / async      | fsync periodically                        | Risk losing last N ms on crash     |

## Crash recovery

On restart the engine doesn't trust the data files. It replays the WAL from the last **checkpoint**, a marker saying "everything before here is already safely in the data files." Recovery follows the ARIES phases:

```text
[ Analysis ] -> rebuild which txns were live / which pages dirty
[  Redo    ] -> reapply ALL logged changes since checkpoint (repeating history)
[  Undo    ] -> roll back txns that never committed
```

Redo brings the database back to the crash-instant state; undo then removes the work of transactions that hadn't committed. Idempotent log records (tagged with an LSN, a log sequence number) make replaying a record twice harmless.

## Where you meet it

PostgreSQL calls it the WAL; SQLite has a WAL journal mode; InnoDB has the redo log; nearly every log-structured store (Kafka, etcd, RocksDB) is WAL all the way down. The pattern even generalizes: any system that wants "durable commit + lazy apply" reaches for an append-only intent log.

## Wrap up

- Log the intent before the data; the log's sequential append is the only thing you must make durable on the hot path.
- `fsync` is the real cost of durability; amortize it with group commit.
- Recovery = replay from checkpoint (redo), then undo uncommitted work; LSNs keep replay idempotent.
