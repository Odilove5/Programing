# Week 01, Day 06: Build an Authorized-Target Report

**Content status:** Authored
**Required:** Yes
**Estimated time:** 90 minutes

## Why this lesson matters

This integration lesson combines values, paths, validation, Git hygiene, and authorization into a small report. The report is deliberately local and fictional: it demonstrates how a dependable tool explains both accepted and rejected records before any later system could use them.

## What you will learn

By the end of this lesson, you will be able to:

- Explain and apply pipeline.
- Explain and apply structured result.
- Explain and apply negative cases.
- Explain and apply reproducibility.

## Concepts

### Pipeline

A pipeline moves data through ordered stages: read, normalize, validate, decide, and report.

### Structured result

Dictionaries and lists preserve fields that a later test or API can inspect.

### Negative cases

Rejected, empty, and out-of-scope records are part of the expected result.

### Reproducibility

A fixture, command, and focused commit make the result reviewable.

## Syntax

`for record in records:`

`result = {"accepted": [], "rejected": []}`

## Worked examples

```python
records = [" demo-a ", "outside"]
allowed = {"demo-a"}
print([r.strip().lower() in allowed for r in records])
```

**Expected output**

```text
[True, False]
```

**Notice:** A boolean preview is useful before producing a structured report.
```python
report = {"accepted": [{"id": "demo-a"}], "rejected": [{"id": "outside", "reason": "out of scope"}]}
print(report)
```

**Expected output**

```text
{'accepted': [{'id': 'demo-a'}], 'rejected': [{'id': 'outside', 'reason': 'out of scope'}]}
```

**Notice:** The report preserves both the result and the reason.

## MarketingOps example

```python
campaigns = [" Spring-Search ", "production"]
allowed = {"spring-search"}
for raw in campaigns:
    name = raw.strip().lower()
    print({"campaign": name, "allowed": name in allowed})
```

**Expected output**

```text
{'campaign': 'spring-search', 'allowed': True}
{'campaign': 'production', 'allowed': False}
```

**Notice:** No live platform is contacted; the report is a local decision artifact.

This fictional example reinforces the Python concept. It does not call a live API, use credentials, or authorize an external action.

## Common mistakes and failure cases

- Dropping rejected records instead of preserving reasons.
- Mixing authorization with formatting so the order is unclear.
- Running against live targets instead of fictional fixtures.

## Check your understanding

1. Which stage should normalize text?
2. What fields make a rejection explainable?
3. Why should the report be deterministic?

<details>
<summary>Explanations after you predict</summary>

1. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
2. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
3. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.

</details>

## Quiz

1. **Which result shape supports accepted and rejected records?**
   - a) A single boolean
   - b) A dictionary containing lists
   - c) An unstructured sentence
2. **What does this project avoid?**
   - a) Fictional fixtures
   - b) Live external actions
   - c) Tests

<details>
<summary>Answer key and explanations</summary>

1. **b** — b is correct because it follows the concrete input/output contract practiced in this lesson.
2. **b** — b is correct because it follows the concrete input/output contract practiced in this lesson.

</details>

## Exercise handoff

Build `authorized_target_report(records, allowed)` that returns ordered accepted and rejected dictionaries. Include original input, normalized value when available, and a reason for every rejection. Add tests for empty, duplicate, and out-of-scope records.

Open [`exercise.py`](exercise.py) and write the implementation yourself. Run:

```bash
python exercise.py
python -m unittest -v
```

The exercise must cover normal input, at least one boundary, and the failure or malformed case named above. Use the hints in the exercise file only after your first attempt. Inspect [`solution.py`](solution.py) only after your tests run or you can explain the remaining failure.

## Weekly project connection

This contributes to the Week 01 project by making `an authorized-target report` more testable and reviewable.

## Official reading

[Python data structures](https://docs.python.org/3/tutorial/datastructures.html) — read the syntax and boundary behavior used in this lesson.

## Navigation

[← Previous lesson](../../week-01/day-05-authorization-scope-and-evidence/instructions.md) · [Week overview](../README.md) · [Full curriculum](../../README.md) · [Next lesson →](../../week-01/day-07-review/instructions.md)
