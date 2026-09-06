# Week 01, Day 05: Authorization, Scope, and Evidence

**Content status:** Authored
**Required:** Yes
**Estimated time:** 90 minutes

## Why this lesson matters

A program can be technically correct and still be unsafe if it acts on the wrong target. Authorization defines what is allowed; scope defines the boundary; evidence records why a decision was made. These ideas prepare you to build MarketingOps systems that never let a recommendation silently become an external action.

## What you will learn

By the end of this lesson, you will be able to:

- A declared set of permitted inputs or resources.
- A decision that an operation is permitted in the declared scope.
- Missing or invalid authorization produces a denial, not a guess.
- A redacted record of input, decision, and reason.

## Concepts

### Scope

A declared set of permitted inputs or resources.

### Authorization

A decision that an operation is permitted in the declared scope.

### Fail closed

Missing or invalid authorization produces a denial, not a guess.

### Evidence

A redacted record of input, decision, and reason.

## Syntax

`decision = {"allowed": bool, "reason": str}`

`if target not in allowed: deny`

## Worked examples

```python
allowed = {"demo-campaign"}
target = "demo-campaign"
print({"allowed": target in allowed, "target": target})
```

**Expected output**

```text
{'allowed': True, 'target': 'demo-campaign'}
```

**Notice:** Membership is deterministic and inspectable.
```python
allowed = {"demo-campaign"}
target = "production-campaign"
print({"allowed": target in allowed, "reason": "outside declared scope"})
```

**Expected output**

```text
{'allowed': False, 'reason': 'outside declared scope'}
```

**Notice:** A denied decision explains the boundary without attempting an action.

## MarketingOps example

```python
proposal = {"action": "publish_content", "campaign": "spring-search"}
policy = {"publish_content": "approval-required"}
print({"action": proposal["action"], "decision": policy[proposal["action"]]})
```

**Expected output**

```text
{'action': 'publish_content', 'decision': 'approval-required'}
```

**Notice:** MarketingOps policy can classify a proposal before any adapter runs.

This fictional example reinforces the Python concept. It does not call a live API, use credentials, or authorize an external action.

## Common mistakes and failure cases

- Treating a normalized name as proof of authorization.
- Allowing a missing policy entry by default.
- Logging secret tokens or customer data as evidence.

## Check your understanding

1. What should happen when a target is absent from the allowlist?
2. Why record the reason for denial?
3. Can an AI recommendation override policy?

<details>
<summary>Think through the questions</summary>

Try the examples and write predictions before opening the reference file.

</details>

## Quiz

1. **What is fail-closed behavior?**
   - a) Allow when uncertain
   - b) Deny when required data is missing
   - c) Retry forever
2. **Who should enforce authorization?**
   - a) Deterministic code
   - b) A printed message
   - c) An unvalidated model string

<details>
<summary>Answer key and explanations</summary>

1. **b** — The correct choice follows the rule taught above.
2. **a** — The correct choice follows the rule taught above.

</details>

## Exercise handoff

Write `authorize_action(action, scope, policy)` that returns an evidence dictionary for allowed, denied, and approval-required actions. Use fictional campaign names and test missing policy data.

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

[← Previous lesson](../../week-01/day-04-input-and-conversion/instructions.md) · [Week overview](../README.md) · [Full curriculum](../../README.md) · [Next lesson →](../../week-01/day-06-an-authorized-target-report/instructions.md)
