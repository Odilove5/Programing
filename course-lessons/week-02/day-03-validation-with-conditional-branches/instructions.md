# Week 02, Day 03: Scoped Decisions from Validated Data

**Content status:** Authored
**Required:** Yes
**Estimated time:** 60 minutes

## Why this lesson matters

A decision should consume validated facts and produce an explainable result. This lesson combines conditionals with normalization so a campaign rule can distinguish valid, denied, and malformed input before any side effect.

## What you will learn

By the end of this lesson, you will be able to:

- Explain and apply preconditions.
- Explain and apply decision table.
- Explain and apply reason codes.
- Explain and apply ordering.

## Concepts

### Preconditions

Validate required fields before comparing them.

### Decision table

List expected combinations before writing nested branches.

### Reason codes

Return a stable reason rather than a vague failure.

### Ordering

Normalize, validate, then decide.

## Syntax

`return {"decision": "allow", "reason": "..."}`

## Worked examples

```python
record = {"status": "active", "spend": 20}
if record["status"] == "active" and record["spend"] <= 50:
    print("allow")
```

**Expected output**

```text
allow
```

**Notice:** Both predicates must be true.
```python
record = {"status": "unknown"}
print({"decision": "deny", "reason": "invalid status"} if record["status"] not in {"active", "paused"} else {"decision": "review"})
```

**Expected output**

```text
{'decision': 'deny', 'reason': 'invalid status'}
```

**Notice:** Malformed state is not silently treated as safe.

## MarketingOps example

```python
goal = {"qualified_leads": 25, "target": 30}
print({"status": "at-risk" if goal["qualified_leads"] < goal["target"] else "on-track"})
```

**Expected output**

```text
{'status': 'at-risk'}
```

**Notice:** A deterministic goal decision can later be given to an AI analyst as evidence.

This fictional example reinforces the Python concept. It does not call a live API, use credentials, or authorize an external action.

## Common mistakes and failure cases

- Comparing values before validating their type.
- Returning a boolean with no explanation.
- Letting a missing field take an accidental default.

## Check your understanding

1. Which check must happen first?
2. What reason should a denied record contain?
3. Can a model replace this rule?

<details>
<summary>Explanations after you predict</summary>

1. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
2. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
3. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.

</details>

## Quiz

1. **What is the safe order?**
   - a) Decide, then validate
   - b) Normalize, validate, decide
   - c) Execute, then inspect
2. **What makes a decision auditable?**
   - a) A reason code
   - b) A hidden branch
   - c) A random default

<details>
<summary>Answer key and explanations</summary>

1. **b** — b is correct because it follows the concrete input/output contract practiced in this lesson.
2. **a** — a is correct because it follows the concrete input/output contract practiced in this lesson.

</details>

## Exercise handoff

Implement `evaluate_campaign(record, limit)` with explicit validation and reason codes for missing, malformed, over-limit, and allowed records.

Open [`exercise.py`](exercise.py) and write the implementation yourself. Run:

```bash
python exercise.py
python -m unittest -v
```

The exercise must cover normal input, at least one boundary, and the failure or malformed case named above. Use the hints in the exercise file only after your first attempt. Inspect [`solution.py`](solution.py) only after your tests run or you can explain the remaining failure.

## Weekly project connection

This contributes to the Week 02 project by making `a scope decision tool` more testable and reviewable.

## Official reading

[Python if statements](https://docs.python.org/3/tutorial/controlflow.html#if-statements) — read the syntax and boundary behavior used in this lesson.

## Navigation

[← Previous lesson](../../week-02/day-02-comparisons-and-boolean-logic/instructions.md) · [Week overview](../README.md) · [Full curriculum](../../README.md) · [Next lesson →](../../week-02/day-04-normalization-and-validation/instructions.md)
