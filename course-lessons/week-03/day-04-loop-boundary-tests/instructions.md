# Week 03, Day 04: Loop Boundary and Termination Tests

**Content status:** Authored (partial)
**Required:** Yes
**Estimated time:** 90 minutes

## Why this lesson matters

A loop can look correct for ordinary input while failing at zero, one, the final allowed value, or an empty collection. Boundary tests make those cases executable. You are learning this now because retries, pages, records, and budgets all have limits in reliable automation.

## What you will learn

By the end of this lesson, you will be able to:

- A value at, just below, or just above a limit.
- A condition such as `<=` includes the boundary; `range` stops before its stop value.
- An assertion can check the state after a loop finishes.
- A test can prove that an invalid or empty input does not perform work.

## Concepts

### Boundary

A value at, just below, or just above a limit.

### Inclusive versus exclusive

A condition such as `<=` includes the boundary; `range` stops before its stop value.

### Termination assertion

An assertion can check the state after a loop finishes.

### Negative tests

A test can prove that an invalid or empty input does not perform work.

## Syntax

`assert actual == expected`

`while current <= maximum:`

`range(1, maximum + 1)`

## Worked examples

```python
for maximum in [0, 1, 3]:
    values = list(range(1, maximum + 1))
    print(maximum, values)
```

**Expected output**

```text
0 []
1 [1]
3 [1, 2, 3]
```

**Notice:** Zero is a meaningful boundary, not an error by itself.
```python
current = 1
while current <= 3:
    current += 1
assert current == 4
print("terminated at", current)
```

**Expected output**

```text
terminated at 4
```

**Notice:** The post-loop value proves why the condition became false.
```python
def count(items):
    return sum(1 for _ in items)
assert count([]) == 0
```

**Expected output**

```text

```

**Notice:** An empty iterable should not require a special fake item.

## MarketingOps example

```python
for limit in [0, 1, 3]:
    attempts = list(range(1, limit + 1))
    print({"limit": limit, "attempts": attempts, "within": len(attempts) <= limit})
```

**Expected output**

```text
{'limit': 0, 'attempts': [], 'within': True}
{'limit': 1, 'attempts': [1], 'within': True}
{'limit': 3, 'attempts': [1, 2, 3], 'within': True}
```

**Notice:** A test can prove a retry never exceeds its configured limit.

This fictional example reinforces the Python concept. It does not call a live API, use credentials, or authorize an external action.

## Common mistakes and failure cases

- Testing only the happy-path value 3.
- Asserting the wrong post-loop value.
- Using a test that passes because it never enters the loop.

## Check your understanding

1. What should `range(1, 1)` contain?
2. What is the final value after the inclusive loop?
3. Which case catches an accidental extra attempt?

<details>
<summary>Think through the questions</summary>

Try the examples and write predictions before opening the reference file.

</details>

## Quiz

1. **Which input exposes a skipped-first-item bug?**
   - a) 0 or 1
   - b) 100 only
   - c) A string label
2. **What does a boundary test compare?**
   - a) Observed and expected edge behavior
   - b) Only formatting
   - c) A username

<details>
<summary>Answer key and explanations</summary>

1. **a** — The correct choice follows the rule taught above.
2. **a** — The correct choice follows the rule taught above.

</details>

## Exercise handoff

Write `test_loop_boundaries()` for maximum values 0, 1, and 3. Verify produced attempts, post-loop state, and that an empty input performs zero iterations.

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

[← Previous lesson](../../week-03/day-03-state-changes-and-termination/instructions.md) · [Week overview](../README.md) · [Full curriculum](../../README.md) · [Next lesson →](../../week-03/day-05-semantic-git-diff-review/instructions.md)
