# Week 03, Day 01: Loops and Bounded `range()` Practice

**Content status:** Authored
**Required:** Yes
**Estimated time:** 45 minutes

## Why this lesson matters

Loops repeat a block of code so a program can process each record or attempt without duplicating statements. This lesson finishes the existing `for` and `while` mental model, then focuses on `range()` boundaries because off-by-one errors can skip a campaign record or retry too many times.

## What you will learn

By the end of this lesson, you will be able to:

- Explain and apply `range()`.
- Explain and apply loop state.
- Prove that a loop reaches a stopping condition.
- Explain and apply loop choice.

## Concepts

### `range()`

`range(stop)`, `range(start, stop)`, and `range(start, stop, step)` produce bounded integer sequences with an exclusive stop.

### Loop state

A `while` loop needs state that changes toward a stopping condition.

### Termination

A loop terminates when its condition becomes false or a bounded iterable is exhausted.

### Loop choice

Use `for` for a known iterable or bounded count; use `while` when changing state controls continuation.

## Syntax

`range(stop)`
`range(start, stop)`
`range(start, stop, step)`

`while condition:
    update_state()`

## Worked examples

```python
for attempt in range(1, 4):
    print(f"Attempt {attempt}")
```

**Expected output**

```text
Attempt 1
Attempt 2
Attempt 3
```

**Notice:** The stop value 4 is excluded.
```python
for value in range(2, 11, 3):
    print(value)
```

**Expected output**

```text
2
5
8
```

**Notice:** The step is added while the next value remains below 11.
```python
attempt = 1
while attempt <= 3:
    print(attempt)
    attempt += 1
```

**Expected output**

```text
1
2
3
```

**Notice:** The state update makes the condition eventually false.

## MarketingOps example

```python
max_attempts = 3
for attempt in range(1, max_attempts + 1):
    print(f"Retry {attempt} of {max_attempts}")
```

**Expected output**

```text
Retry 1 of 3
Retry 2 of 3
Retry 3 of 3
```

**Notice:** `max_attempts + 1` makes the inclusive human count fit an exclusive stop.

This fictional example reinforces the Python concept. It does not call a live API, use credentials, or authorize an external action.

## Common mistakes and failure cases

- Using `range(1, max_attempts)` and silently skipping the last attempt.
- Forgetting the `while` state update and creating an infinite loop.
- Assuming `range(3, 1)` counts down without a negative step.

## Check your understanding

1. How many values are in `range(1, 4)`?
2. What does `range(3, 1)` produce?
3. What changes after each while-loop iteration?

<details>
<summary>Explanations after you predict</summary>

1. Review the boundary and input contract is correct because range uses an exclusive stop, so the final boundary is not emitted.
2. Review the boundary and input contract is correct because range uses an exclusive stop, so the final boundary is not emitted.
3. Review the boundary and input contract is correct because the loop condition must eventually become false through an explicit state change.

</details>

## Quiz

1. **Why is the stop 4 for three attempts?**
   - a) Stop is exclusive
   - b) Python adds one automatically
   - c) It is random
2. **What prevents a while loop from running forever?**
   - a) A changing state and reachable condition
   - b) A print statement
   - c) A dictionary

<details>
<summary>Answer key and explanations</summary>

1. **a** — a is correct because range uses an exclusive stop, so the final boundary is not emitted.
2. **a** — a is correct because the loop condition must eventually become false through an explicit state change.

</details>

## Exercise handoff

Write `bounded_attempts(max_attempts)` using `range()` and `safe_countdown(start)` using `while`. Test zero, one, and three boundaries and assert that both loops terminate with the expected values.

Open [`exercise.py`](exercise.py) and write the implementation yourself. Run:

```bash
python exercise.py
python -m unittest -v
```

The exercise must cover normal input, at least one boundary, and the failure or malformed case named above. Use the hints in the exercise file only after your first attempt. Inspect [`solution.py`](solution.py) only after your tests run or you can explain the remaining failure.

## Weekly project connection

This contributes to the Week 03 project by making `a blank-file campaign rules checker` more testable and reviewable.

## Official reading

[Python range](https://docs.python.org/3/library/stdtypes.html#range) — read the syntax and boundary behavior used in this lesson.

## Navigation

[← Previous lesson](../../week-02/day-07-review/instructions.md) · [Week overview](../README.md) · [Full curriculum](../../README.md) · [Next lesson →](../../week-03/day-02-collections-and-loops/instructions.md)
