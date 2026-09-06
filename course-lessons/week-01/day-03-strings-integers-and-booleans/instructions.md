# Week 01, Day 03: Normalize and Validate Operator Input

**Content status:** Authored
**Required:** Yes
**Estimated time:** 90 minutes

## Why this lesson matters

Raw text from a person or file is not yet a valid identifier. Normalization makes equivalent spellings comparable; validation decides whether the normalized value satisfies a contract. This builds directly on strings and input and is the first boundary before any MarketingOps calculation or action.

## What you will learn

By the end of this lesson, you will be able to:

- Use operations such as `strip()` and `lower()` to create a canonical representation.
- Check a rule and return a clear decision instead of letting malformed data travel deeper.
- Keep the original input and reason for rejection so a report can be explained.
- A function that receives text and returns a result is easy to test without I/O.

## Concepts

### Normalization

Use operations such as `strip()` and `lower()` to create a canonical representation.

### Validation

Check a rule and return a clear decision instead of letting malformed data travel deeper.

### Rejected evidence

Keep the original input and reason for rejection so a report can be explained.

### Pure boundary functions

A function that receives text and returns a result is easy to test without I/O.

## Syntax

`clean = value.strip().lower()`

`if not clean: ...`

`return {"valid": ..., "reason": ...}`

## Worked examples

```python
def normalize_label(raw):
    return raw.strip().lower()

print(normalize_label("  Spring-Search  "))
```

**Expected output**

```text
spring-search
```

**Notice:** Normalization changes presentation but keeps the meaning.
```python
def validate_label(raw):
    value = raw.strip().lower()
    if not value:
        return {"valid": False, "reason": "empty"}
    return {"valid": True, "value": value}

print(validate_label("   "))
```

**Expected output**

```text
{'valid': False, 'reason': 'empty'}
```

**Notice:** The invalid case is explicit and does not reach later logic.

## MarketingOps example

```python
records = [" Spring-Search ", "", "RETARGETING"]
for record in records:
    print(validate_label(record))
```

**Expected output**

```text
{'valid': True, 'value': 'spring-search'}
{'valid': False, 'reason': 'empty'}
{'valid': True, 'value': 'retargeting'}
```

**Notice:** A rejected campaign identifier remains observable.

This fictional example reinforces the Python concept. It does not call a live API, use credentials, or authorize an external action.

## Common mistakes and failure cases

- Validating before stripping whitespace.
- Returning only `False` and losing the rejection reason.
- Treating normalization as authorization; a clean value still needs policy checks.

## Check your understanding

1. Should `"  A  "` and `"a"` compare equal here?
2. What evidence should a rejected record preserve?
3. Where should normalization happen?

<details>
<summary>Think through the questions</summary>

Try the examples and write predictions before opening the reference file.

</details>

## Quiz

1. **What does normalization do?**
   - a) Deletes all data
   - b) Creates a consistent representation
   - c) Approves an action
2. **What should a validator return for blank input?**
   - a) A useful rejection
   - b) A network request
   - c) A silent success

<details>
<summary>Answer key and explanations</summary>

1. **b** — The correct choice follows the rule taught above.
2. **a** — The correct choice follows the rule taught above.

</details>

## Exercise handoff

Implement `normalize_campaign_id(raw)` and `validate_campaign_id(raw)`. Return accepted normalized values and rejection reasons. Test whitespace, mixed case, empty input, and an internal space.

Open [`exercise.py`](exercise.py) and write the implementation yourself. Run:

```bash
python exercise.py
python -m unittest -v
```

The exercise must cover normal input, at least one boundary, and the failure or malformed case named above. Use the hints in the exercise file only after your first attempt. Inspect [`solution.py`](solution.py) only after your tests run or you can explain the remaining failure.

## Weekly project connection

This contributes to the Week 01 project by making `an authorized-target report` more testable and reviewable.

## Official reading

[Python documentation](https://docs.python.org/3/tutorial/) — use the relevant section for this lesson's syntax and behavior.

## Navigation

[← Previous lesson](../../week-01/day-02-values-and-variables/instructions.md) · [Week overview](../README.md) · [Full curriculum](../../README.md) · [Next lesson →](../../week-01/day-04-input-and-conversion/instructions.md)
