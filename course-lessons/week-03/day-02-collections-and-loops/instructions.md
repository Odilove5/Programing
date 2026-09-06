# Week 03, Day 02: Lists, Sets, `for`, `range()`, and `while`

**Content status:** Authored
**Required:** Yes
**Estimated time:** 45 minutes

## Why this lesson matters

A campaign report usually contains many records. Lists preserve record order, dictionaries describe one record, and sets answer uniqueness or membership questions. You learned loops separately; now you combine them to transform a small collection without losing evidence or duplicating logic.

## What you will learn

By the end of this lesson, you will be able to:

- Explain and apply list of records.
- Explain and apply set of unique values.
- Explain and apply dictionary fields.
- Explain and apply looping choices.

## Concepts

### List of records

A list holds many records in processing order.

### Set of unique values

A set removes duplicates and supports membership checks.

### Dictionary fields

A dictionary gives each record named fields.

### Looping choices

Use `for` to process each record; use `while` only when state, not items, controls continuation.

## Syntax

`records = [{"name": ..., "status": ...}]`

`for record in records:`

`channels = {record["channel"] for record in records}`

## Worked examples

```python
campaigns = [{"name": "Search"}, {"name": "Social"}]
for campaign in campaigns:
    print(campaign["name"])
```

**Expected output**

```text
Search
Social
```

**Notice:** The list controls order; the dictionary controls field access.
```python
channels = {"paid", "organic", "paid"}
print(channels)
```

**Expected output**

```text
{'paid', 'organic'}
```

**Notice:** Sets retain one copy of each value; do not use them when order matters.
```python
remaining = 3
while remaining:
    print(remaining)
    remaining -= 1
```

**Expected output**

```text
3
2
1
```

**Notice:** A while loop is appropriate when a counter is the state being changed.

## MarketingOps example

```python
campaigns = [{"name": "Search", "channel": "paid", "status": "active"}, {"name": "Social", "channel": "organic", "status": "paused"}]
print({c["channel"] for c in campaigns})
```

**Expected output**

```text
{'paid', 'organic'}
```

**Notice:** Unique channels are a set; campaign records remain ordered dictionaries in a list.

This fictional example reinforces the Python concept. It does not call a live API, use credentials, or authorize an external action.

## Common mistakes and failure cases

- Using a set for records and losing order or duplicate evidence.
- Using an index when a `for record in records` loop is clearer.
- Accessing a missing dictionary key without deciding how to handle it.

## Check your understanding

1. Which structure stores many records?
2. Why are channels a set?
3. What should an empty campaign list return?

<details>
<summary>Explanations after you predict</summary>

1. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
2. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
3. Review the boundary and input contract is correct because an empty or zero input should produce no work while preserving a valid result.

</details>

## Quiz

1. **Which structure preserves duplicate records?**
   - a) List
   - b) Set
   - c) None
2. **Which expression iterates fields?**
   - a) `record.items()`
   - b) `record.add()`
   - c) `record.append()`

<details>
<summary>Answer key and explanations</summary>

1. **a** — a is correct because it follows the concrete input/output contract practiced in this lesson.
2. **a** — a is correct because it follows the concrete input/output contract practiced in this lesson.

</details>

## Exercise handoff

Implement `summarize_campaigns(campaigns)` returning names in order, unique channels, and active records. Test normal and empty input plus one malformed record.

Open [`exercise.py`](exercise.py) and write the implementation yourself. Run:

```bash
python exercise.py
python -m unittest -v
```

The exercise must cover normal input, at least one boundary, and the failure or malformed case named above. Use the hints in the exercise file only after your first attempt. Inspect [`solution.py`](solution.py) only after your tests run or you can explain the remaining failure.

## Weekly project connection

This contributes to the Week 03 project by making `a blank-file campaign rules checker` more testable and reviewable.

## Official reading

[Python data structures](https://docs.python.org/3/tutorial/datastructures.html) — read the syntax and boundary behavior used in this lesson.

## Navigation

[← Previous lesson](../../week-03/day-01-loops-and-range/instructions.md) · [Week overview](../README.md) · [Full curriculum](../../README.md) · [Next lesson →](../../week-03/day-03-state-and-termination/instructions.md)
