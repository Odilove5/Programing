# Week 03, Day 06: Blank-File Campaign Rules Checker

**Content status:** Authored
**Required:** Yes
**Estimated time:** 90 minutes

## Why this lesson matters

This is the Week 3 mastery project. You will start from a blank implementation and use lists, dictionaries, sets, conditionals, loops, functions, and tests to identify fictional campaigns that violate spend or CPA rules. The project proves retrieval, not copying.

## What you will learn

By the end of this lesson, you will be able to:

- Explain and apply record validation.
- Explain and apply rule evaluation.
- Explain and apply evidence.
- Explain and apply blank-file retrieval.

## Concepts

### Record validation

Reject missing or malformed numeric fields before arithmetic.

### Rule evaluation

Apply deterministic thresholds one campaign at a time.

### Evidence

Return campaign ID, violated rule, and observed value.

### Blank-file retrieval

The requirements and tests are available; the implementation is yours.

## Syntax

`def check_campaigns(campaigns, max_spend, max_cpa):`

`return {"violations": [...], "rejected": [...]}`

## Worked examples

```python
campaign = {"id": "search", "spend": 500, "conversions": 20}
cpa = campaign["spend"] / campaign["conversions"]
print(cpa)
```

**Expected output**

```text
25.0
```

**Notice:** Arithmetic is deterministic and should handle zero conversions explicitly.
```python
campaign = {"id": "social", "spend": 300, "conversions": 0}
print({"id": campaign["id"], "reason": "zero conversions"})
```

**Expected output**

```text
{'id': 'social', 'reason': 'zero conversions'}
```

**Notice:** A zero denominator is evidence to classify, not a crash to ignore.

## MarketingOps example

```python
campaigns = [{"id": "search", "spend": 500, "conversions": 20}]
print([c["id"] for c in campaigns if c["spend"] > 400])
```

**Expected output**

```text
['search']
```

**Notice:** The final project is local fictional data; no advertising platform is contacted.

This fictional example reinforces the Python concept. It does not call a live API, use credentials, or authorize an external action.

## Common mistakes and failure cases

- Dividing by zero when conversions are zero.
- Dropping malformed records instead of preserving rejection evidence.
- Letting a model decide arithmetic or thresholds.

## Check your understanding

1. Which fields are required?
2. What should zero conversions mean?
3. How will a violation be explained?

<details>
<summary>Explanations after you predict</summary>

1. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
2. Review the boundary and input contract is correct because an empty or zero input should produce no work while preserving a valid result.
3. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.

</details>

## Quiz

1. **Who calculates CPA?**
   - a) Deterministic Python
   - b) A prose prompt
   - c) A random guess
2. **What belongs in rejected evidence?**
   - a) Input and reason
   - b) Only the ID
   - c) Nothing

<details>
<summary>Answer key and explanations</summary>

1. **a** — a is correct because it follows the concrete input/output contract practiced in this lesson.
2. **a** — a is correct because it follows the concrete input/output contract practiced in this lesson.

</details>

## Exercise handoff

From an empty file, implement `check_campaigns(campaigns, max_spend, max_cpa)`. Return violations and rejected records, handle zero conversions and malformed data, and add normal/boundary/invalid tests.

Open [`exercise.py`](exercise.py) and write the implementation yourself. Run:

```bash
python exercise.py
python -m unittest -v
```

The exercise must cover normal input, at least one boundary, and the failure or malformed case named above. Use the hints in the exercise file only after your first attempt. Inspect [`solution.py`](solution.py) only after your tests run or you can explain the remaining failure.

## Weekly project connection

This contributes to the Week 03 project by making `a blank-file campaign rules checker` more testable and reviewable.

## Official reading

[Python errors and exceptions](https://docs.python.org/3/tutorial/errors.html) — read the syntax and boundary behavior used in this lesson.

## Navigation

[← Previous lesson](../../week-03/day-05-semantic-git-diff-review/instructions.md) · [Week overview](../README.md) · [Full curriculum](../../README.md) · [Next lesson →](../../week-03/day-07-review/instructions.md)
