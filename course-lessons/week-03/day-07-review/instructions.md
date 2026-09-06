# Week 03, Day 07: Optional Review and Recovery: Loops and Collections

**Content status:** Authored
**Required:** Optional review
**Estimated time:** 30 minutes

## Why this lesson matters

Review days are optional retrieval practice. You pause new material, rebuild the week's smallest examples without notes, and record which concept needs another attempt. This prevents a passing guided exercise from being mistaken for independent mastery.

## What you will learn

By the end of this lesson, you will be able to:

- Explain and apply retrieval.
- Explain and apply reflection.
- Explain and apply recovery plan.
- Explain and apply no new scope.

## Concepts

### Retrieval

Rebuild from requirements rather than copying a previous file.

### Reflection

Name the exact concept or boundary that remains uncertain.

### Recovery plan

Choose one small next attempt with a testable result.

### No new scope

Review improves reliability without adding a new framework.

## Syntax

`assert explanation`

`python -m unittest -v`

## Worked examples

```python
values = list(range(1, 4))
assert values == [1, 2, 3]
print("retrieved")
```

**Expected output**

```text
retrieved
```

**Notice:** A small assertion can prove a recalled boundary.
```python
records = [{"channel": "paid"}, {"channel": "paid"}]
assert {r["channel"] for r in records} == {"paid"}
```

**Expected output**

```text

```

**Notice:** The set assertion checks uniqueness without discarding the original list.

## MarketingOps example

```python
goal = {"concept": "campaign rules", "next_attempt": "test zero conversions"}
print(goal)
```

**Expected output**

```text
{'concept': 'campaign rules', 'next_attempt': 'test zero conversions'}
```

**Notice:** A review note points to a concrete MarketingOps capability without pretending it is mastered.

This fictional example reinforces the Python concept. It does not call a live API, use credentials, or authorize an external action.

## Common mistakes and failure cases

- Reading the solution before attempting retrieval.
- Writing a vague reflection such as `loops are hard`.
- Adding new project scope instead of fixing one weak boundary.

## Check your understanding

1. Which concept can you rebuild without notes?
2. Which boundary failed?
3. What is the smallest next test?

<details>
<summary>Explanations after you predict</summary>

1. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
2. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
3. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.

</details>

## Quiz

1. **What is the goal of review day?**
   - a) Honest retrieval
   - b) More frameworks
   - c) Skipping tests
2. **What makes a recovery plan useful?**
   - a) A concrete next attempt
   - b) A vague feeling
   - c) No evidence

<details>
<summary>Answer key and explanations</summary>

1. **a** — a is correct because it follows the concrete input/output contract practiced in this lesson.
2. **a** — a is correct because it follows the concrete input/output contract practiced in this lesson.

</details>

## Exercise handoff

Create a short retrieval report with one rebuilt loop, one collection transformation, one failing or boundary test, and a next-attempt note. Day 7 is optional and does not count toward required completion.

Open [`exercise.py`](exercise.py) and write the implementation yourself. Run:

```bash
python exercise.py
python -m unittest -v
```

The exercise must cover normal input, at least one boundary, and the failure or malformed case named above. Use the hints in the exercise file only after your first attempt. Inspect [`solution.py`](solution.py) only after your tests run or you can explain the remaining failure.

## Weekly project connection

This contributes to the Week 03 project by making `a blank-file campaign rules checker` more testable and reviewable.

## Official reading

[Python tutorial](https://docs.python.org/3/tutorial/) — read the syntax and boundary behavior used in this lesson.

## Navigation

[← Previous lesson](../../week-03/day-06-campaign-rules-checker/instructions.md) · [Week overview](../README.md) · [Full curriculum](../../README.md) · [Next lesson →](../../week-04/day-01-transform-campaign-records/instructions.md)
