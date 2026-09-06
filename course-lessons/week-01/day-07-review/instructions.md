# Week 01, Day 07: Optional Review: Values and Safe Decisions

**Content status:** Authored
**Required:** Optional review
**Estimated time:** 30 minutes

## Why this lesson matters

Use this optional day to retrieve Week 1 without opening a reference solution. Rebuild one small value-to-decision program, inspect its boundary, and write a recovery note if a concept is still uncertain.

## What you will learn

By the end of this lesson, you will be able to:

- Explain and apply retrieval.
- Explain and apply boundary review.
- Explain and apply evidence.
- Explain and apply recovery.

## Concepts

### Retrieval

Recall the syntax before looking it up.

### Boundary review

Test empty, malformed, and out-of-scope values.

### Evidence

Record what you ran and observed.

### Recovery

Choose one concrete next attempt.

## Syntax

`assert actual == expected`

## Worked examples

```python
value = "demo"
assert value.strip() == "demo"
print("reviewed")
```

**Expected output**

```text
reviewed
```

**Notice:** A small assertion can verify recalled behavior.

## MarketingOps example

```python
print({"topic": "input validation", "next_attempt": "test blank campaign id"})
```

**Expected output**

```text
{'topic': 'input validation', 'next_attempt': 'test blank campaign id'}
```

**Notice:** The note connects foundation recall to a later course capability.

This fictional example reinforces the Python concept. It does not call a live API, use credentials, or authorize an external action.

## Common mistakes and failure cases

- Calling a concept mastered because the example looked familiar.
- Writing no observable evidence.
- Adding new scope instead of reviewing one weak boundary.

## Check your understanding

1. Which Week 1 concept can you rebuild?
2. Which boundary will you test?
3. What is your next attempt?

<details>
<summary>Explanations after you predict</summary>

1. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
2. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
3. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.

</details>

## Quiz

1. **What is review day for?**
   - a) Retrieval
   - b) Skipping tests
   - c) New credentials

<details>
<summary>Answer key and explanations</summary>

1. **a** — a is correct because it follows the concrete input/output contract practiced in this lesson.

</details>

## Exercise handoff

Create a three-line retrieval example and a short text report naming one concept, one observed result, and one next attempt.

Open [`exercise.py`](exercise.py) and write the implementation yourself. Run:

```bash
python exercise.py
python -m unittest -v
```

The exercise must cover normal input, at least one boundary, and the failure or malformed case named above. Use the hints in the exercise file only after your first attempt. Inspect [`solution.py`](solution.py) only after your tests run or you can explain the remaining failure.

## Weekly project connection

This contributes to the Week 01 project by making `an authorized-target report` more testable and reviewable.

## Official reading

[Python tutorial](https://docs.python.org/3/tutorial/) — read the syntax and boundary behavior used in this lesson.

## Navigation

[← Previous lesson](../../week-01/day-06-authorized-target-report/instructions.md) · [Week overview](../README.md) · [Full curriculum](../../README.md) · [Next lesson →](../../week-02/day-01-conditionals-and-decisions/instructions.md)
