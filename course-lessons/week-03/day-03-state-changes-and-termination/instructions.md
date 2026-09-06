# Week 03, Day 03: State Changes and Termination

**Content status:** Authored (partial)
**Required:** Yes
**Estimated time:** 90 minutes

## Why this lesson matters

A `while` loop is a promise to keep working while a condition is true. The promise is safe only when the loop changes state toward a reachable stopping point. This lesson makes the state transition visible before you use a loop in a retry, queue, or polling workflow.

## What you will learn

By the end of this lesson, you will be able to:

- Variables such as `attempt`, `index`, or `remaining` describe where the loop is now.
- The loop body changes state so the next condition check can differ.
- A statement that should remain true during each iteration helps you reason about correctness.
- A bounded limit, empty queue, or successful condition must be reachable.

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
<summary>Think through the questions</summary>

Try the examples and write predictions before opening the reference file.

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

1. **a** — The correct choice follows the rule taught above.
2. **a** — The correct choice follows the rule taught above.

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

[Python documentation](https://docs.python.org/3/tutorial/) — use the relevant section for this lesson's syntax and behavior.

## Navigation

[← Previous lesson](../../week-03/day-02-lists-sets-for-loops-range-and-while/instructions.md) · [Week overview](../README.md) · [Full curriculum](../../README.md) · [Next lesson →](../../week-03/day-04-loop-boundary-tests/instructions.md)
