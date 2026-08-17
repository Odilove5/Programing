# CLI Training Archive: Make scoped decisions from validated data

Week 2, Day 3 · Python automation

## Technical lesson overview

This lesson introduces make scoped decisions from validated data before asking you to write commands or code. First build a mental model of the vocabulary and data flow below. You will then see the notion in a realistic authorized-lab situation, explain it in your own words, complete small guided checks, and finally build a project from a blank editor.

## Learning objectives

- Explain make scoped decisions from validated data in plain language
- Implement a small python automation example without copying
- Test normal, boundary, and failure behavior
- Connect the result to defensive validation and evidence quality

## Technical concept explanation

### Technical lesson

Conditionals select behavior using expressions that become True or False. Use if, elif, and else when branches are mutually exclusive, combine predicates with and, or, and not, and prefer direct membership tests over deeply nested comparisons. Imports make functions and constants from another module available; importing does not mean copying its source. This week, use ipaddress from the standard library to parse local target text and permit it only when it belongs to the declared lab network.

### How to practise Make scoped decisions from validated data

Turn the weekly Python idea into automation with a clear boundary: parse and validate input, perform one operation, return structured output, and report a specific error. Add dry-run, timeout, or allowlist enforcement wherever a side effect or external resource is involved.

### Build the security-tool component

Build make scoped decisions from validated data as a small data pipeline: accept a local value, validate its shape, transform it, and print or save a structured result. Use modern Python 3 syntax, precise exceptions, and a fixture that cannot contact a network. The objective is independent coding fluency, not memorizing a recipe.

## CLI course content and completed exercises

### Technical lesson overview

This lesson developed a deterministic Python decision pipeline:

```text
raw input -> normalization -> conversion -> validation -> decision -> structured result
```

The program normalizes an action string, safely converts a numeric limit,
evaluates ordered rules, and records the outcome in a dictionary. The technical
concepts follow the Python tutorial and standard-library documentation.

### 1. Normalization and validation

Normalization converts equivalent input representations into a consistent
form:

```python
raw_action = "   READ-STATUS   "
normalized_action = raw_action.strip().lower()
```

`.strip()` removes whitespace from both ends of the string. `.lower()` returns
a lowercase copy. The resulting value is `"read-status"`.

Normalization does not prove that an action is valid. Membership testing checks
the normalized value against the program's permitted set:

```python
allowed_actions = {"collect-headers", "read-status"}

if normalized_action not in allowed_actions:
    reason = "action is not allowed"
```

### 2. Safe defaults

The program begins with a rejected decision:

```python
limit = None
decision = "rejected"
reason = "validation has not completed"
```

`None` represents the absence of a validated integer. The decision changes to
`"accepted"` only in the final branch after every rule passes.

### 3. Integer conversion and exception handling

`int()` converts numeric text to an integer. Invalid text raises `ValueError`,
so conversion is placed inside `try`:

```python
try:
    limit = int(limit_text)
except ValueError:
    reason = "limit must be a whole number"
else:
    # Remaining validation runs only after conversion succeeds.
```

The `try` statement's `else` suite runs only when the `try` suite completes
without an exception. This guarantees that numeric comparisons operate on an
integer rather than unvalidated text.

### 4. Ordered conditional rules

The program uses one `if`/`elif`/`else` chain:

```python
if not normalized_action:
    reason = "action is empty"
elif normalized_action not in allowed_actions:
    reason = "action is not allowed"
elif not is_active:
    reason = "operation is inactive"
elif limit < 1 or limit > 10:
    reason = "limit must be between 1 and 10"
else:
    decision = "accepted"
    reason = "all checks passed"
```

Python evaluates branches from top to bottom and executes only the first
matching branch. The range condition uses `or` because either a value below `1`
or a value above `10` must be rejected. Values `1` and `10` are accepted
boundaries.

### 5. Structured results with dictionaries

A dictionary associates descriptive keys with the processed values:

```python
result = {
    "input_action": raw_action,
    "normalized_action": normalized_action,
    "limit": limit,
    "decision": decision,
    "reason": reason,
}
```

Square brackets retrieve a value by key:

```python
print(f'Decision: {result["decision"]}')
```

The raw and normalized forms are both retained so the output shows what entered
the program and what was evaluated.

### Programming concepts learned

- String methods `.strip()` and `.lower()`
- Sets and membership testing with `not in`
- Safe defaults and `None`
- Integer conversion with `int()`
- `try`, `except ValueError`, and `else`
- Ordered `if`, `elif`, and `else` branches
- Boolean negation with `not`
- Numeric comparisons and `or`
- Inclusive boundary validation
- Dictionary creation and key access
- f-string output
- Deterministic input-to-output behavior

### Guided exercises completed

The student normalized `"   COLLECT-HEADERS   "`, applied an allowlist and
active-state decision, stored the result in a dictionary, and printed raw,
normalized, decision, and reason fields. Corrections covered quoting set values,
the assignment operator for a dictionary, consistent variable names, and
retrieving dictionary values rather than standalone names.

### Final project

The student built `action_decision.py`. It processes `"   READ-STATUS   "` and
the string limit `"5"`, converts and validates the limit, evaluates the action
and active state, and prints:

```text
Input action:    READ-STATUS
Normalized action: read-status
Limit: 5
Decision: accepted
Reason: all checks passed
```

### Automated tests

`test_action_decision.py` passed nine cases:

- Baseline accepted input
- Lower boundary `1`
- Upper boundary `10`
- Nonnumeric limit
- Empty action
- Unknown action
- Inactive operation
- Limit below range
- Limit above range

The harness runs variations in memory and verifies that the student program is
not modified.

### Git packaging commands

```powershell
# Enter and confirm the project folder.
cd C:\Users\Tester\security-study-coach\workspace\week2-day3-decisions
pwd

# Create the isolated repository.
git init

# Trust only this exact sandbox-created training folder for the Tester account.
git config --global --add safe.directory "C:/Users/Tester/security-study-coach/workspace/week2-day3-decisions"

# Inspect repository state and run the program.
git status
python action_decision.py

# Inspect project and ignored files, then run all automated cases.
git status --short --ignored
python test_action_decision.py

# Stage only the intended project files.
git add -- .gitignore README.md action_decision.py test_action_decision.py
git status --short

# Review the staged snapshot and check its formatting.
git diff --cached --stat
git diff --cached
git diff --cached --check

# Inspect and configure the repository-local author identity.
git config user.name
git config user.email
git config --local user.name "Odilon Nguemou"
git config --local user.email "odilon@local.invalid"
git config --local user.name
git config --local user.email

# Re-run tests and confirm the staging state before committing.
python test_action_decision.py
git status --short

# Create the commit, then correct its original message.
git commit -m "Add tester operation decision program"
git commit --amend -m "Add tested operation decision program"

# Inspect the final history and working tree.
git log --oneline -1
git status
```

The final clean snapshot is commit
`9eae467 Add tested operation decision program`.

### Official documentation

- Python control flow: https://docs.python.org/3/tutorial/controlflow.html
- Python errors and exceptions: https://docs.python.org/3/tutorial/errors.html
- Python data structures: https://docs.python.org/3/tutorial/datastructures.html
- Python built-in `int`: https://docs.python.org/3/library/functions.html#int
- Python string methods: https://docs.python.org/3/library/stdtypes.html#string-methods

## Student solution

```python
allowed_actions = {"collect-headers", "read-status"}
raw_action = "   READ-STATUS   "
is_active = True
normalized_action = raw_action.strip().lower()
limit_text = "5"
limit = None

decision = "rejected"
reason = "validation has not completed"

try:
    limit = int(limit_text)
except ValueError:
    reason = "limit must be a whole number"
else:
    if not normalized_action:
        reason = "action is empty"
    elif normalized_action not in allowed_actions:
        reason = "action is not allowed"
    elif not is_active:
        reason = "operation is inactive"
    elif limit < 1 or limit > 10:
        reason = "limit must be between 1 and 10"
    else:
        decision = "accepted"
        reason = "all checks passed"

result = {
    "input_action": raw_action,
    "normalized_action": normalized_action,
    "limit": limit,
    "decision": decision,
    "reason": reason,
}

print(f'Input action: {result["input_action"]}')
print(f'Normalized action: {result["normalized_action"]}')
print(f'Limit: {result["limit"]}')
print(f'Decision: {result["decision"]}')
print(f'Reason: {result["reason"]}')
```

## Student notes

Completed normalization, conversion, ordered validation, structured results, nine automated tests, and guided Git packaging.

## Completion record

- Lesson completed in the local study platform.
- CLI exercises and final student solution captured.
- Archive regenerated: 2026-08-12T14:29:49.907Z
