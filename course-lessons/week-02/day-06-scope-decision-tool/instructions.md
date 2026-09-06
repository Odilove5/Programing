# Week 02, Day 06: Build a Scope-Aware Target Validator

**Content status:** Authored
**Required:** Yes
**Estimated time:** 90 minutes

## Why this lesson matters

This project combines normalization, Boolean decisions, functions, tests, Git review, and safe defaults. It models a target validator using fictional names so you can practise the complete flow before touching any external system.

## What you will learn

By the end of this lesson, you will be able to:

- Explain and apply function contract.
- Explain and apply allowlist.
- Explain and apply guard clauses.
- Explain and apply tests as policy.

## Concepts

### Function contract

Document inputs, outputs, and rejection reasons.

### Allowlist

A set of explicitly permitted normalized values.

### Guard clauses

Reject invalid cases early so the success path stays readable.

### Tests as policy

Assertions make the intended boundary executable.

## Syntax

`def validate_target(raw, allowed):`

`return {"accepted": ..., "reason": ...}`

## Worked examples

```python
def validate(raw, allowed):
    value = raw.strip().lower()
    return {"accepted": value in allowed, "value": value}

print(validate(" Demo ", {"demo"}))
```

**Expected output**

```text
{'accepted': True, 'value': 'demo'}
```

**Notice:** The normalized value is the one checked against scope.
```python
for raw in ["demo", "unknown"]:
    print(validate(raw, {"demo"}))
```

**Expected output**

```text
{'accepted': True, 'value': 'demo'}
{'accepted': False, 'value': 'unknown'}
```

**Notice:** Each input receives an independent, explainable result.

## MarketingOps example

```python
records = [" Spring-Search ", "Production"]
for record in records:
    print(validate(record, {"spring-search"}))
```

**Expected output**

```text
{'accepted': True, 'value': 'spring-search'}
{'accepted': False, 'value': 'production'}
```

**Notice:** The project is a local scope check, not a network scanner.

This fictional example reinforces the Python concept. It does not call a live API, use credentials, or authorize an external action.

## Common mistakes and failure cases

- Accepting before normalization.
- Returning no reason for rejected input.
- Testing only an allowed case.

## Check your understanding

1. What should an empty target return?
2. Why use a set for allowed values?
3. Which negative case proves the boundary?

<details>
<summary>Explanations after you predict</summary>

1. Review the boundary and input contract is correct because an empty or zero input should produce no work while preserving a valid result.
2. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
3. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.

</details>

## Quiz

1. **What does the allowlist contain?**
   - a) Permitted normalized values
   - b) Every value seen
   - c) Passwords
2. **What should tests include?**
   - a) Only success
   - b) Success and rejection
   - c) No assertions

<details>
<summary>Answer key and explanations</summary>

1. **a** — a is correct because it follows the concrete input/output contract practiced in this lesson.
2. **b** — b is correct because it follows the concrete input/output contract practiced in this lesson.

</details>

## Exercise handoff

Implement `validate_target(raw, allowed)` with accepted and rejected result dictionaries. Add tests for whitespace, empty input, internal spaces, duplicate input, and out-of-scope values.

Open [`exercise.py`](exercise.py) and write the implementation yourself. Run:

```bash
python exercise.py
python -m unittest -v
```

The exercise must cover normal input, at least one boundary, and the failure or malformed case named above. Use the hints in the exercise file only after your first attempt. Inspect [`solution.py`](solution.py) only after your tests run or you can explain the remaining failure.

## Weekly project connection

This contributes to the Week 02 project by making `a scope decision tool` more testable and reviewable.

## Official reading

[OWASP authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) — read the syntax and boundary behavior used in this lesson.

## Navigation

[← Previous lesson](../../week-02/day-05-functions-and-basic-tests/instructions.md) · [Week overview](../README.md) · [Full curriculum](../../README.md) · [Next lesson →](../../week-02/day-07-review/instructions.md)
