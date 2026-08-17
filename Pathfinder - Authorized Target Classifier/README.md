# Pathfinder: Authorized Target Classifier

A Week 3, Day 1 Python project that normalizes and classifies multiple
fictional lab targets. The program performs no network activity.

## Technical lesson overview

This lesson introduced Python iteration with `for` loops. It demonstrated how
a loop variable receives one item at a time, how counters and accumulators
retain information between iterations, and how conditions control what happens
to each item.

The final project combines loops with string normalization, lists, sets,
dictionaries, membership tests, guard clauses, `continue`, functions, and
automated tests. It separates authorized targets from rejected inputs while
preserving the original processing order.

## Learning objectives

By completing this lesson, the student can:

- Explain how a `for` loop processes an iterable.
- Trace the value of a loop variable during each iteration.
- Distinguish a counter from an accumulator.
- Filter values into a new list with `append()`.
- Explain the differences between lists and sets.
- Use a set for unique allowlist membership checks.
- Use lists when order and duplicate result records matter.
- Use `continue` to skip the rest of one iteration.
- Use `break` to stop an entire loop.
- Normalize text with `strip()` and `lower()`.
- Apply guard clauses while processing multiple values.
- Return accepted and rejected records in a structured dictionary.
- Iterate over result dictionaries to generate a readable report.
- Test normal, boundary, duplicate, empty, and rejected inputs with `unittest`.

## Technical concept explanation

### `for` loops and loop variables

A `for` loop retrieves one item at a time from an iterable:

```python
targets = ["lab-server.local", "training-api.local"]

for target in targets:
    print(target)
```

`targets` is the iterable, and `target` is the loop variable. The loop body
runs once per item. After the loop, the loop variable still refers to the last
item assigned to it.

### Counters and accumulators

A counter records how many events occurred:

```python
count = 0

for target in targets:
    count = count + 1
```

An accumulator combines or collects information over several iterations. A
numeric accumulator can calculate a sum, while a list accumulator can collect
matching values:

```python
high_ports = []

for port in [22, 80, 443, 3000, 8443]:
    if port > 1024:
        high_ports.append(port)
```

The final list is `[3000, 8443]`.

### Lists and sets

A list preserves insertion order, permits duplicates, and supports indexing:

```python
accepted_targets = []
accepted_targets.append({"normalized": "lab-server.local"})
```

A set stores unique, hashable values and is designed for membership checks:

```python
allowed_targets = {
    "lab-server.local",
    "training-api.local",
}
```

The classifier uses a set for the allowlist because uniqueness and membership
matter. It uses lists for accepted and rejected results because processing
order and duplicate records must be preserved.

| Feature | List | Set |
| --- | --- | --- |
| Syntax | `[]` | `{}` or `set()` |
| Preserves insertion order | Yes | Do not use for positional order |
| Permits duplicates | Yes | No |
| Supports indexing | Yes | No |
| Add one item | `.append()` | `.add()` |
| Typical use here | Result records | Allowlist membership |

An empty set must be created with `set()` because `{}` creates an empty
dictionary.

### `continue` and `break`

`continue` skips the remainder of the current iteration and moves to the next
item. The classifier uses it after recording each rejected target:

```python
if not normalized_target:
    rejected_targets.append({
        "input": raw_target,
        "reason": "target is empty",
    })
    continue
```

`break` stops the entire loop. It was demonstrated with a `"STOP"` sentinel,
but the final classifier does not need it because every supplied target should
receive a classification.

### Normalization and validation

The expression below removes surrounding whitespace and converts letters to
lowercase:

```python
normalized_target = raw_target.strip().lower()
```

It does not remove internal spaces. For example,
`"TRAINING API.LOCAL"` becomes `"training api.local"`, which remains invalid.
Normalization makes equivalent valid values consistent; it does not silently
repair structurally invalid input.

### Guard clauses inside a loop

Each failed rule appends a rejection record and executes `continue`. A target
can reach the accepted accumulator only after it passes every guard:

```text
Normalize target
      |
      +-- Empty? --------------------> reject, continue
      +-- Contains spaces? ----------> reject, continue
      +-- Not in allowlist? ---------> reject, continue
      `-- All checks passed ---------> accept
```

## Student questions and answers

This section contains only questions asked by the student during the lesson.
Instructor prompts used to guide exercises are intentionally excluded.

### What is the difference between a list and a set, and when should each be used?

A list is an ordered collection that permits duplicates and supports indexing.
Use a list when processing order matters, repeated values must be retained, or
items need to be retrieved by position. The classifier therefore uses lists
for `accepted_targets` and `rejected_targets`.

A set stores unique, hashable values and is designed for membership tests. Use
a set when uniqueness matters and the program frequently checks whether a value
is present. The classifier therefore uses a set for `allowed_targets`.

```python
allowed_targets = {
    "lab-server.local",
    "training-api.local",
}

accepted_targets = []
rejected_targets = []
```

## Final project

The completed classifier:

1. Receives raw targets and an explicit allowlist.
2. Normalizes each target.
3. Rejects empty targets.
4. Rejects targets containing spaces.
5. Rejects targets outside the allowlist.
6. Collects accepted and rejected dictionaries separately.
7. Returns both result lists.
8. Prints counts and readable result details.

Run it with:

```powershell
python target_classifier.py
```

Expected output:

```text
Accepted: 2
Rejected: 3

Accepted targets:
- lab-server.local
- training-api.local

Rejected targets:
- "": target is empty
- "TRAINING API.LOCAL": target contains spaces
- "production.example": target is not allowed
```

## Automated tests

Run the test suite with:

```powershell
python -m unittest -v
```

Seven test methods verify:

- Mixed accepted and rejected inputs
- Empty and whitespace-only targets
- Internal spaces
- Targets outside the allowlist
- Duplicate inputs
- An empty input list
- Preservation of processing order

Final observed result:

```text
Ran 7 tests in 0.000s

OK
```

## Project files

- `target_classifier.py`: student classifier and example report
- `test_target_classifier.py`: automated `unittest` suite
- `.gitignore`: generated-file exclusions
- `README.md`: technical lesson summary and project documentation

## Official documentation

- Python `for` statements: https://docs.python.org/3/tutorial/controlflow.html#for-statements
- Python `break` and `continue`: https://docs.python.org/3/tutorial/controlflow.html#break-and-continue-statements
- Python data structures: https://docs.python.org/3/tutorial/datastructures.html
- Python set types: https://docs.python.org/3/library/stdtypes.html#set-types-set-frozenset
- Python `unittest`: https://docs.python.org/3/library/unittest.html

## Completion record

- Guided loop exercises completed.
- Final classifier produced the expected report.
- Seven automated test methods passed.
- Python compilation checks passed.
- Git packaging is in progress and remains under student control.
