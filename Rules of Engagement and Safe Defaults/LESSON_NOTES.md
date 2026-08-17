# CLI Training Archive: Rules of engagement and safe defaults

Week 2, Day 5 · Security methodology

## Technical lesson overview

This lesson extended prior validation knowledge with an explainable full-rule
evaluation design. Instead of stopping at the first failed condition, the
program evaluates safe, independent Boolean expressions, records every result,
aggregates them, and reports all failed rule names. Previously completed basics
such as variables, sets, dictionaries, and ordinary conditionals were used
without being retaught.

## Learning objectives

By completing this lesson, the student demonstrated the ability to:

- Aggregate Boolean values with Python's built-in `all()`.
- Iterate through dictionary key-value pairs with `.items()`.
- Unpack each dictionary pair into two loop variables.
- Build a filtered list using a list comprehension.
- Validate an inclusive numeric range with a chained comparison.
- Select a value using a conditional expression.
- Compare fail-fast and full-evaluation designs.
- Build a nested, explainable rule trace.
- Identify the `all([]) is True` edge case.
- Test individual, boundary, and simultaneous failures.

## Technical concept explanation

### Aggregating rules with `all()`

`all(iterable)` returns `True` only when every value supplied by the iterable is
truthy:

```python
policy_passed = all(rule_results.values())
```

`dict.values()` supplies the dictionary values. If one recorded rule is
`False`, the aggregate result is `False`. Python defines `all([])` as `True`, so
a policy engine must ensure that required rules actually exist rather than
treating an empty rule collection as sufficient evidence.

### Dictionary iteration and unpacking

`dict.items()` supplies key-value pairs:

```python
for name, passed in rule_results.items():
    print(f"{name}: {passed}")
```

During each iteration, tuple unpacking assigns the key to `name` and the value
to `passed`.

### List comprehensions

A list comprehension can collect only failed rule names:

```python
failed_rules = [
    name
    for name, passed in rule_results.items()
    if not passed
]
```

The expression adds `name`, the loop visits every dictionary item, and the
filter keeps only items whose Boolean result is false. Dictionary insertion
order preserves the defined rule order in the resulting list.

### Chained comparisons

Python expresses an inclusive range clearly:

```python
1 <= request_limit <= 10
```

This is equivalent to requiring both `request_limit >= 1` and
`request_limit <= 10`. The boundary values `1` and `10` pass; `0` and `11` fail.

### Conditional expressions

A conditional expression selects a value:

```python
decision = "accepted" if policy_passed else "rejected"
```

Unlike an `if` statement, the expression itself produces the value assigned to
`decision`.

### Fail-fast and full evaluation

An `if`/`elif` chain is fail-fast because it stops after the first matching
branch. A rule dictionary evaluates every expression and provides a full trace.
Full evaluation is appropriate only when every expression is independently
safe and inexpensive. Fail-fast validation remains necessary when a later
operation would be unsafe before an earlier type or existence check succeeds.

### Guided CLI course content and completed exercises

### Understanding checks

The student correctly determined that:

- `all([True, False, True])` is `False`.
- The second dictionary iteration unpacked `"action_allowed"` and `False`.
- A comprehension selected `['target_allowed', 'approval_active']` from two
  false rule values.
- Fail-fast evaluation is preferable when a later rule is unsafe until an
  earlier validation succeeds.
- The chained comparisons for `1`, `10`, and `11` produce `True`, `True`, and
  `False`.

### Guided project

The student built `rule_evaluator.py` from a blank rule section. The program:

1. Creates four independent rule results.
2. Aggregates them with `all(rule_results.values())`.
3. Collects failures using dictionary iteration and a list comprehension.
4. Selects decision and reason strings using conditional expressions.
5. Stores a nested result dictionary.
6. Prints every rule result and the final explainable decision.

Corrections included using `.values()` instead of a nonexistent `.value()`,
using `if` rather than a semicolon in the list comprehension, referencing the
existing `approval_active` input rather than hardcoding `True`, and correcting
the exact failure-reason spelling.

Observed baseline output:

```text
target_allowed: True
action_allowed: True
approval_active: True
limit_allowed: True
Policy passed: True
Failed rules: []
Decision: accepted
Reason: all rules passed
```

### Automated tests

`test_rule_evaluator.py` passed ten checks:

- All rules pass
- Target rejected
- Action rejected
- Approval inactive
- Limit below range
- Limit above range
- Lower boundary accepted
- Upper boundary accepted
- Four simultaneous failures in defined order
- Empty iterable behavior documented and guarded conceptually

The harness also verified the structured result, exact final output, rule order,
and unchanged student source-file hash.

### Git packaging commands

```powershell
git init
python test_rule_evaluator.py
git -c safe.directory=C:/Users/Tester/security-study-coach/workspace/week2-day5-rule-evaluator status --short --ignored
git -c safe.directory=C:/Users/Tester/security-study-coach/workspace/week2-day5-rule-evaluator add -- .gitignore README.md rule_evaluator.py test_rule_evaluator.py
git -c safe.directory=C:/Users/Tester/security-study-coach/workspace/week2-day5-rule-evaluator diff --cached --stat
git -c safe.directory=C:/Users/Tester/security-study-coach/workspace/week2-day5-rule-evaluator diff --cached --check
git -c safe.directory=C:/Users/Tester/security-study-coach/workspace/week2-day5-rule-evaluator config --local user.name "Odilon Nguemou"
git -c safe.directory=C:/Users/Tester/security-study-coach/workspace/week2-day5-rule-evaluator config --local user.email "odilon@local.invalid"
git -c safe.directory=C:/Users/Tester/security-study-coach/workspace/week2-day5-rule-evaluator commit -m "Add tested explainable rule evaluator"
git -c safe.directory=C:/Users/Tester/security-study-coach/workspace/week2-day5-rule-evaluator log --oneline -1
git -c safe.directory=C:/Users/Tester/security-study-coach/workspace/week2-day5-rule-evaluator status --short --ignored
```

Final commit:

```text
8b43676 Add tested explainable rule evaluator
```

### Official documentation

- Python `all()`: https://docs.python.org/3/library/functions.html#all
- Dictionary iteration: https://docs.python.org/3/tutorial/datastructures.html#looping-techniques
- List comprehensions: https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions
- Comparisons: https://docs.python.org/3/reference/expressions.html#comparisons
- Conditional expressions: https://docs.python.org/3/reference/expressions.html#conditional-expressions

## CLI course content and completed exercises

No guided CLI exercises have been recorded yet.

## Student solution

```shell
allowed_targets = {"training-api.local", "lab-server.local"}
allowed_actions = {"read-status", "collect-headers"}

target = "training-api.local"
action = "read-status"
approval_active = True
request_limit = 5

rule_results = {
    "target_allowed": target in allowed_targets,
    "action_allowed": action in allowed_actions,
    "approval_active": approval_active,
    "limit_allowed": 1 <= request_limit <= 10,
    }

policy_passed = all(rule_results.values())
failed_rules = [
    name
    for name, passed in rule_results.items()
    if not passed
    ]

decision = "accepted" if policy_passed else "rejected"
reason = "all rules passed" if policy_passed else "one or more rules failed"

result = {
    "target": target,
    "action": action,
    "rule_results": rule_results,
    "policy_passed": policy_passed,
    "failed_rules": failed_rules,
    "decision": decision,
    "reason": reason,
}

for name, passed in result["rule_results"].items():
    print(f"{name}: {passed}")

print(f'Policy passed: {result["policy_passed"]}')
print(f'Failed rules: {result["failed_rules"]}')
print(f'Decision: {result["decision"]}')
print(f'Reason: {result["reason"]}')
```

## Student notes

Completed all(), dictionary iteration, unpacking, list comprehensions, chained comparisons, conditional expressions, explainable rule traces, ten automated checks, and Git packaging.

## Completion record

- Lesson completed in the local study platform.
- CLI exercises and final student solution captured.
- Archive regenerated: 2026-08-12T21:31:42.465Z
