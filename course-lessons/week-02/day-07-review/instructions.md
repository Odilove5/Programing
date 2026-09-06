# Week 02, Day 07: Optional Review: Decisions and Validation

**Content status:** Authored
**Required:** Optional review
**Estimated time:** 30 minutes

## Why this lesson matters

Review Week 2 by rebuilding one conditional rule and one validation test from memory. The goal is honest calibration before the loop and collection work, not another project.

## What you will learn

By the end of this lesson, you will be able to:

- Explain and apply decision recall.
- Explain and apply negative cases.
- Explain and apply test evidence.
- Explain and apply next step.

## Concepts

### Decision recall

Explain the branch before running it.

### Negative cases

Include at least one denied or malformed value.

### Test evidence

Use an assertion to preserve the expected decision.

### Next step

Name the concept to practise next.

## Syntax

`assert decision == expected`

## Worked examples

```python
spend = 120
assert (spend > 100) is True
print("boundary reviewed")
```

**Expected output**

```text
boundary reviewed
```

**Notice:** The assertion makes the boundary explicit.

## MarketingOps example

```python
print({"rule": "spend limit", "next_attempt": "test missing spend"})
```

**Expected output**

```text
{'rule': 'spend limit', 'next_attempt': 'test missing spend'}
```

**Notice:** A small retrieval note supports the deterministic KPI work ahead.

This fictional example reinforces the Python concept. It does not call a live API, use credentials, or authorize an external action.

## Common mistakes and failure cases

- Testing only the allowed branch.
- Treating missing data as zero without a rule.
- Recording confidence without a concrete example.

## Check your understanding

1. What branch is the boundary?
2. What missing field should do?
3. What will you practise next?

<details>
<summary>Explanations after you predict</summary>

1. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
2. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
3. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.

</details>

## Quiz

1. **What makes a review useful?**
   - a) A runnable check
   - b) A vague score
   - c) No failure case

<details>
<summary>Answer key and explanations</summary>

1. **a** — a is correct because it follows the concrete input/output contract practiced in this lesson.

</details>

## Exercise handoff

Rebuild a spend decision with one allowed and one denied assertion, then write a recovery note naming a missing-data case.

Open [`exercise.py`](exercise.py) and write the implementation yourself. Run:

```bash
python exercise.py
python -m unittest -v
```

The exercise must cover normal input, at least one boundary, and the failure or malformed case named above. Use the hints in the exercise file only after your first attempt. Inspect [`solution.py`](solution.py) only after your tests run or you can explain the remaining failure.

## Weekly project connection

This contributes to the Week 02 project by making `a scope decision tool` more testable and reviewable.

## Official reading

[Python tutorial](https://docs.python.org/3/tutorial/) — read the syntax and boundary behavior used in this lesson.

## Navigation

[← Previous lesson](../../week-02/day-06-scope-decision-tool/instructions.md) · [Week overview](../README.md) · [Full curriculum](../../README.md) · [Next lesson →](../../week-03/day-01-loops-and-range/instructions.md)
