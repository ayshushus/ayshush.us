---
title: Agentic loops and tool use
description: The think→act→observe cycle, how tool calling works, and when a loop beats a single prompt.
date: 2026-01-28
tags: [agents, tool-use, llm, orchestration]
---

An agent is a language model placed inside a loop with access to tools. Instead of producing one answer, it reasons, takes an action, observes the result, and repeats until done. This note covers the mechanics and when the extra machinery actually pays off.

## The loop

```text
        ┌─────────────────────────────┐
        ▼                             │
   ┌─────────┐    ┌────────┐    ┌──────────┐
   │  THINK  │ →  │  ACT   │ →  │ OBSERVE  │
   │ (reason)│    │(call   │    │ (read    │
   │         │    │ tool)  │    │  result) │
   └─────────┘    └────────┘    └──────────┘
        ▲                             │
        └──────────── until done ─────┘
```

Each turn the model decides whether it has enough information to answer or whether it needs to call a tool. Tool results are appended to the conversation and fed back, so the model's context grows with everything it has learned.

## How tool calls actually work

The model doesn't execute anything itself. You declare tools as structured schemas; the model emits a request to call one; your code runs it and returns the output.

```ts
const tools = [{
  name: "get_weather",
  description: "Current weather for a city",
  input_schema: {
    type: "object",
    properties: { city: { type: "string" } },
    required: ["city"],
  },
}];
```

The exchange is a strict turn-taking protocol:

| Step | Who | Content |
| :--- | :--- | :--- |
| 1 | model | "I need weather for Lisbon" → tool_use(get_weather, {city: "Lisbon"}) |
| 2 | your code | run the function, get `18°C, clear` |
| 3 | you | send tool_result back into the conversation |
| 4 | model | continue reasoning, or answer |

The model decides *which* tool and *what arguments*; your runtime owns *execution* and the loop's stopping condition.

## A minimal loop

```python
messages = [{"role": "user", "content": task}]
while True:
    resp = model.run(messages, tools=tools)
    messages.append(resp.message)
    if not resp.tool_calls:        # model gave a final answer
        return resp.text
    for call in resp.tool_calls:
        result = dispatch(call.name, call.args)
        messages.append(tool_result(call.id, result))
```

Two things keep this safe in production: a **max-iterations cap** so a confused model can't loop forever, and **validation** of tool arguments before execution (the model can and will hallucinate malformed inputs).

## When a loop beats a single prompt

A loop adds latency, cost, and failure surface. Use one only when the task genuinely needs it.

- **Unknown number of steps.** "Find the bug and fix it" — you can't know upfront how many files to read.
- **The model needs ground truth it can't have.** Live data, code execution, search results. A single prompt can only guess.
- **Error recovery.** A test fails, the agent reads the output and tries again. Single prompts can't observe their own mistakes.

Conversely, prefer a single prompt when the task is **bounded and self-contained** — summarize this text, classify this ticket, rewrite this paragraph. No external state means no reason to loop, and the loop only adds ways to go wrong.

## Failure modes

- **Looping without progress** — same tool, same args, same result. Detect repetition and break.
- **Context bloat** — every observation accumulates; long tasks blow the window. Summarize or prune old turns.
- **Over-eager tool use** — the model calls tools when it already knows the answer. Sharpen tool descriptions and system guidance.

## Wrap up

- An agent is just an LLM in a think→act→observe loop with tools; your code owns execution and termination.
- Reach for a loop only when step count is unknown or the model needs real-world feedback.
- Always cap iterations, validate tool inputs, and guard against no-progress loops.

## References

- Yao et al., *ReAct: Synergizing Reasoning and Acting in Language Models* (2022)
- Schick et al., *Toolformer: Language Models Can Teach Themselves to Use Tools* (2023)
