# Week 02, Day 05: Rules of Engagement and Safe Defaults

**Content status:** Authored
**Required:** Yes
**Estimated time:** 90 minutes

## Why this lesson matters

A rules-of-engagement document turns an ambiguous task into explicit boundaries. Safe defaults prevent an unfinished configuration from becoming an action. This lesson connects conditional logic to the policy discipline needed by later agents and adapters.

## What you will learn

By the end of this lesson, you will be able to:

- A named operation that policy explicitly permits.
- An operation outside scope or over a limit.
- A bounded action that needs a human decision.
- Unknown actions are denied until policy says otherwise.

## Concepts

### Allowed action

A named operation that policy explicitly permits.

### Denied action

An operation outside scope or over a limit.

### Approval required

A bounded action that needs a human decision.

### Default closed

Unknown actions are denied until policy says otherwise.

## Syntax

`policy.get(action, "deny")`

`if decision == "approval-required": ...`

## Worked examples

```python
policy = {"read_metrics": "allow", "publish": "approval-required"}
for action in ["read_metrics", "publish", "delete"]:
    print(action, policy.get(action, "deny"))
```

**Expected output**

```text
read_metrics allow
publish approval-required
delete deny
```

**Notice:** The missing `delete` rule fails closed.
```python
request = {"action": "publish", "approved": False}
print("execute" if request["approved"] else "hold")
```

**Expected output**

```text
hold
```

**Notice:** Approval is a separate state, not an implied success.

## MarketingOps example

```python
action = "change_budget"
print({"action": action, "decision": "approval-required", "reason": "budget changes require a human"})
```

**Expected output**

```text
{'action': 'change_budget', 'decision': 'approval-required', 'reason': 'budget changes require a human'}
```

**Notice:** A recommendation cannot bypass an approval boundary.

This fictional example reinforces the Python concept. It does not call a live API, use credentials, or authorize an external action.

## Common mistakes and failure cases

- Defaulting unknown actions to allow.
- Treating approval-required as already approved.
- Writing policy only in prose with no testable values.

## Check your understanding

1. What should an unknown action do?
2. Who makes an approval decision?
3. Why separate policy from execution?

<details>
<summary>Think through the questions</summary>

Try the examples and write predictions before opening the reference file.

</details>

## Quiz

1. **What is fail-closed?**
   - a) Unknown action denied
   - b) Unknown action executed
   - c) Unknown action ignored
2. **What does approval-required mean?**
   - a) Execute now
   - b) Hold for a human
   - c) Delete the request

<details>
<summary>Answer key and explanations</summary>

1. **a** — The correct choice follows the rule taught above.
2. **b** — The correct choice follows the rule taught above.

</details>

## Exercise handoff

Implement `policy_decision(action, context)` for read, draft, publish, and budget-change actions. Return allow, deny, or approval-required with a reason.

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

[← Previous lesson](../../week-02/day-04-normalization-and-validation/instructions.md) · [Week overview](../README.md) · [Full curriculum](../../README.md) · [Next lesson →](../../week-02/day-06-a-scope-decision-tool/instructions.md)
