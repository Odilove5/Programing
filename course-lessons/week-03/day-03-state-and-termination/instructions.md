# Week 03, Day 03: State Changes and Termination

**Content status:** Authored
**Required:** Yes
**Estimated time:** 60 minutes

## Why this lesson matters

A `while` loop is a promise to keep working while a condition is true. The promise is safe only when the loop changes state toward a reachable stopping point. This lesson makes the state transition visible before you use a loop in a retry, queue, or polling workflow.

## What you will learn

By the end of this lesson, you will be able to:

- Name the state that controls a loop.
- Implement a state transition.
- Explain and apply invariant.
- Prove that a loop reaches a stopping condition.

## Concepts

### State

Variables such as `attempt`, `index`, or `remaining` describe where the loop is now.

### Transition

The loop body changes state so the next condition check can differ.

### Invariant

A statement that should remain true during each iteration helps you reason about correctness.

### Termination

A bounded limit, empty queue, or successful condition must be reachable.

## Syntax

`while state_is_valid(state):
    state = next_state(state)`

## Worked examples

```python
remaining = 3
while remaining > 0:
    print(remaining)
    remaining -= 1
```

**Expected output**

```text
3
2
1
```

**Notice:** The state moves 3 → 2 → 1 → 0.
```python
items = ["a", "b"]
index = 0
while index < len(items):
    print(items[index])
    index += 1
```

**Expected output**

```text
a
b
```

**Notice:** The index changes after each access and reaches the list length.
```python
queue = ["metric-1"]
while queue:
    job = queue.pop(0)
    print(job)
```

**Expected output**

```text
metric-1
```

**Notice:** Removing work makes the queue condition eventually false.

## MarketingOps example

```python
attempt = 1
max_attempts = 3
while attempt <= max_attempts:
    print(f"collect metrics: {attempt}")
    attempt += 1
```

**Expected output**

```text
collect metrics: 1
collect metrics: 2
collect metrics: 3
```

**Notice:** A bounded collection retry has explicit state and a hard limit.

This fictional example reinforces the Python concept. It does not call a live API, use credentials, or authorize an external action.

## Common mistakes and failure cases

- Changing a different variable than the one in the condition.
- Incrementing after a `continue` path is skipped.
- Using a condition that cannot become false.

## Check your understanding

1. Which variable changes?
2. What value makes the condition false?
3. What happens when the queue is empty before the loop starts?

<details>
<summary>Explanations after you predict</summary>

1. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
2. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
3. Review the boundary and input contract is correct because an empty or zero input should produce no work while preserving a valid result.

</details>

## Quiz

1. **What is a state transition?**
   - a) A changed loop variable
   - b) A print label
   - c) A type annotation
2. **What proves termination?**
   - a) A reachable stopping condition
   - b) More output
   - c) A larger list

<details>
<summary>Answer key and explanations</summary>

1. **a** — a is correct because the loop condition must eventually become false through an explicit state change.
2. **a** — a is correct because it follows the concrete input/output contract practiced in this lesson.

</details>

## Exercise handoff

Implement `retry_states(max_attempts)` that returns each attempt and `drain_queue(items)` that removes each item exactly once. Add assertions for zero, one, and multiple items.

Open [`exercise.py`](exercise.py) and write the implementation yourself. Run:

```bash
python exercise.py
python -m unittest -v
```

The exercise must cover normal input, at least one boundary, and the failure or malformed case named above. Use the hints in the exercise file only after your first attempt. Inspect [`solution.py`](solution.py) only after your tests run or you can explain the remaining failure.

## Weekly project connection

This contributes to the Week 03 project by making `a blank-file campaign rules checker` more testable and reviewable.

## Official reading

[Python while statements](https://docs.python.org/3/reference/compound_stmts.html#the-while-statement) — read the syntax and boundary behavior used in this lesson.

## Navigation

[← Previous lesson](../../week-03/day-02-collections-and-loops/instructions.md) · [Week overview](../README.md) · [Full curriculum](../../README.md) · [Next lesson →](../../week-03/day-04-loop-boundary-tests/instructions.md)
