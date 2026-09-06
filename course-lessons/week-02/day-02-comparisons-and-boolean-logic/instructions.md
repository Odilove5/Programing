# Week 02, Day 02: PowerShell Objects and Pipelines

**Content status:** Authored
**Required:** Yes
**Estimated time:** 90 minutes

## Why this lesson matters

PowerShell pipelines pass objects rather than only lines of text. Learning to inspect properties and filter objects helps you work across the supported shell environments without confusing display formatting with data. The Python course still owns the business rules; the shell lesson teaches safe observation.

## What you will learn

By the end of this lesson, you will be able to:

- A PowerShell object has properties and possibly methods.
- `|` passes each object to the next command.
- `Where-Object` selects objects whose property meets a condition.
- Display commands change presentation, not the underlying object.

## Concepts

### Objects

A PowerShell object has properties and possibly methods.

### Pipeline

`|` passes each object to the next command.

### Filtering

`Where-Object` selects objects whose property meets a condition.

### Formatting

Display commands change presentation, not the underlying object.

## Syntax

`Get-ChildItem | Where-Object { $_.Length -gt 0 }`

## Worked examples

```python
items = [{"name": "a.json", "bytes": 20}, {"name": "empty.json", "bytes": 0}]
print([item["name"] for item in items if item["bytes"] > 0])
```

**Expected output**

```text
['a.json']
```

**Notice:** The Python list comprehension mirrors a property filter without hiding the data shape.
```python
items = [{"name": "a", "status": "ok"}, {"name": "b", "status": "failed"}]
for item in items:
    print(item["name"], item["status"])
```

**Expected output**

```text
a ok
b failed
```

**Notice:** Inspect properties before deciding what to include.

## MarketingOps example

```python
records = [{"campaign": "search", "leads": 4}, {"campaign": "social", "leads": 0}]
print([r["campaign"] for r in records if r["leads"] > 0])
```

**Expected output**

```text
['search']
```

**Notice:** Marketing records remain structured objects even when viewed in a shell.

This fictional example reinforces the Python concept. It does not call a live API, use credentials, or authorize an external action.

## Common mistakes and failure cases

- Filtering formatted strings instead of object properties.
- Assuming a missing property is zero.
- Running a mutating command when observation was requested.

## Check your understanding

1. What property is being filtered?
2. Why preserve object shape?
3. What should a missing field do?

<details>
<summary>Think through the questions</summary>

Try the examples and write predictions before opening the reference file.

</details>

## Quiz

1. **What travels through a PowerShell pipeline?**
   - a) Objects
   - b) Only passwords
   - c) Python bytecode
2. **What does formatting change?**
   - a) Presentation
   - b) Authorization
   - c) The source data

<details>
<summary>Answer key and explanations</summary>

1. **a** — The correct choice follows the rule taught above.
2. **a** — The correct choice follows the rule taught above.

</details>

## Exercise handoff

Create a fictional list of process-like records and write a read-only filter that returns records above a threshold. State which property is required and how missing properties are handled.

Open [`exercise.py`](exercise.py) and write the implementation yourself. Run:

```bash
python exercise.py
python -m unittest -v
```

The exercise must cover normal input, at least one boundary, and the failure or malformed case named above. Use the hints in the exercise file only after your first attempt. Inspect [`solution.py`](solution.py) only after your tests run or you can explain the remaining failure.

## Weekly project connection

This contributes to the Week 02 project by making `a scope decision tool` more testable and reviewable.

## Official reading

[Python documentation](https://docs.python.org/3/tutorial/) — use the relevant section for this lesson's syntax and behavior.

## Navigation

[← Previous lesson](../../week-02/day-01-make-decisions-with-data/instructions.md) · [Week overview](../README.md) · [Full curriculum](../../README.md) · [Next lesson →](../../week-02/day-03-conditional-branches/instructions.md)
