# Week 01, Day 01: Values, Types, Input, and Output

**Content status:** Authored
**Required:** Yes
**Estimated time:** 45 minutes

## Why this lesson matters

A Python program is a sequence of expressions that produces values. Naming those values and displaying them lets a later step use earlier information. You begin here because every validator, connector, and KPI calculation in MarketingOps is built from values with known types.

## What you will learn

By the end of this lesson, you will be able to:

- Identify Python values by type.
- Assign names to values and inspect them.
- Convert and validate text at an input boundary.
- Format deterministic output.

## Concepts

### Values and types

Integers, floats, strings, booleans, and None represent different kinds of information. `type()` lets you inspect a value rather than guessing.

### Names and assignment

Assignment binds a name to a value; it does not permanently label the value or copy a file.

### Input boundaries

`input()` returns text. Convert and validate it at the boundary before using it as a number.

### Output

`print()` is a presentation side effect. f-strings make labels explicit and readable.

## Syntax

`name = value`

`text = input(prompt)`

`print(f"label: {value}")`

## Worked examples

```python
spend = 125.50
print(type(spend).__name__)
print(f"Spend: ${spend:.2f}")
```

**Expected output**

```text
float
Spend: $125.50
```

**Notice:** The value is numeric before it is formatted.
```python
raw = "  42  "
leads = int(raw.strip())
print(leads + 1)
```

**Expected output**

```text
43
```

**Notice:** Whitespace is removed before conversion; invalid text would raise `ValueError`.

## MarketingOps example

```python
campaign = "spring-search"
spend = 500.0
leads = 20
print(f"{campaign}: {leads} leads from ${spend:.2f}")
```

**Expected output**

```text
spring-search: 20 leads from $500.00
```

**Notice:** Campaign data is still ordinary Python values; business meaning comes from clear names.

This fictional example reinforces the Python concept. It does not call a live API, use credentials, or authorize an external action.

## Common mistakes and failure cases

- Using `input()` text in arithmetic without `int()` or `float()`.
- Confusing the string `"20"` with the integer `20`.
- Printing a value and assuming `print()` changed its type.

## Check your understanding

1. What is the type of `"20"`?
2. Why does `float("20.5")` work but `float("twenty")` fail?
3. What should happen if a campaign spend is blank?

<details>
<summary>Explanations after you predict</summary>

1. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
2. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
3. Review the boundary and input contract is correct because an empty or zero input should produce no work while preserving a valid result.

</details>

## Quiz

1. **Which expression converts text to an integer?**
   - a) `str(value)`
   - b) `int(text)`
   - c) `type(text)`
2. **What does assignment do?**
   - a) Binds a name to a value
   - b) Prints the value
   - c) Always copies the value

<details>
<summary>Answer key and explanations</summary>

1. **b** — b is correct because it follows the concrete input/output contract practiced in this lesson.
2. **a** — a is correct because it follows the concrete input/output contract practiced in this lesson.

</details>

## Exercise handoff

Write `campaign_preview(name, spend, leads)` that returns a labeled string. In the main block, read fictional campaign values, convert numeric input, and handle a non-numeric spend with a useful message.

Open [`exercise.py`](exercise.py) and write the implementation yourself. Run:

```bash
python exercise.py
python -m unittest -v
```

The exercise must cover normal input, at least one boundary, and the failure or malformed case named above. Use the hints in the exercise file only after your first attempt. Inspect [`solution.py`](solution.py) only after your tests run or you can explain the remaining failure.

## Weekly project connection

This contributes to the Week 01 project by making `an authorized-target report` more testable and reviewable.

## Official reading

[Python values and types](https://docs.python.org/3/tutorial/introduction.html) — read the syntax and boundary behavior used in this lesson.

## Navigation

[Week overview](../README.md) · [Full curriculum](../../README.md) · [Next lesson →](../../week-01/day-02-paths-quoting-and-redirection/instructions.md)
