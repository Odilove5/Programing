# Week 02, Day 01: Conditionals, Boolean Logic, and Imports

**Content status:** Authored
**Required:** Yes
**Estimated time:** 45 minutes

## Why this lesson matters

Programs need to choose a path based on facts. Boolean expressions produce True or False, conditionals select a branch, and imports reuse trusted library behavior. This follows input validation and gives campaign rules an explicit decision structure.

## What you will learn

By the end of this lesson, you will be able to:

- Explain and apply comparisons.
- Explain and apply boolean logic.
- Explain and apply branches.
- Explain and apply imports.

## Concepts

### Comparisons

Operators compare values.

### Boolean logic

`and`, `or`, and `not` combine decisions.

### Branches

`if`/`elif`/`else` choose one path.

### Imports

An import makes a module's names available without copying its source.

## Syntax

`if condition:
    ...
elif other:
    ...
else:
    ...`

## Worked examples

```python
spend = 80
if spend > 100:
    print("over")
else:
    print("within")
```

**Expected output**

```text
within
```

**Notice:** Only the matching branch runs.
```python
from pathlib import Path
print(Path("fixtures").name)
```

**Expected output**

```text
fixtures
```

**Notice:** Imports provide focused standard-library tools.

## MarketingOps example

```python
leads = 0
if leads == 0:
    print("investigate missing conversion data")
```

**Expected output**

```text
investigate missing conversion data
```

**Notice:** A branch should expose a data-quality state, not invent a KPI.

This fictional example reinforces the Python concept. It does not call a live API, use credentials, or authorize an external action.

## Common mistakes and failure cases

- Using `=` instead of `==` in a comparison.
- Writing overlapping branches in the wrong order.
- Assuming a false condition means data is safe.

## Check your understanding

1. Which branch runs when `spend` is 80?
2. What does `and` require?
3. Why import a library instead of reimplementing it?

<details>
<summary>Explanations after you predict</summary>

1. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
2. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
3. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.

</details>

## Quiz

1. **Which operator tests equality?**
   - a) =
   - b) ==
   - c) =>
2. **What does `else` represent?**
   - a) The fallback branch
   - b) A loop
   - c) An import

<details>
<summary>Answer key and explanations</summary>

1. **b** — b is correct because it follows the concrete input/output contract practiced in this lesson.
2. **a** — a is correct because it follows the concrete input/output contract practiced in this lesson.

</details>

## Exercise handoff

Implement `classify_spend(spend, limit)` returning `within`, `over`, or `invalid`, and import a standard-library type used in a small validation check.

Open [`exercise.py`](exercise.py) and write the implementation yourself. Run:

```bash
python exercise.py
python -m unittest -v
```

The exercise must cover normal input, at least one boundary, and the failure or malformed case named above. Use the hints in the exercise file only after your first attempt. Inspect [`solution.py`](solution.py) only after your tests run or you can explain the remaining failure.

## Weekly project connection

This contributes to the Week 02 project by making `a scope decision tool` more testable and reviewable.

## Official reading

[Python control flow](https://docs.python.org/3/tutorial/controlflow.html) — read the syntax and boundary behavior used in this lesson.

## Navigation

[← Previous lesson](../../week-01/day-07-review/instructions.md) · [Week overview](../README.md) · [Full curriculum](../../README.md) · [Next lesson →](../../week-02/day-02-comparisons-and-boolean-logic/instructions.md)
