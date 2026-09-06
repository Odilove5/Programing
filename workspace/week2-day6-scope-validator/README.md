# Scope-Aware Target Validator

Week 2, Day 6 Python project. The program validates fictional local-lab target
data only and performs no network activity.

## Technical lesson overview

This lesson introduced functions as reusable units of behavior. The project
separates target normalization, target validation, allowlist membership, port
validation, policy evaluation, and output formatting into focused functions.

It also introduced parameters, arguments, local variables, return values,
guard clauses, function composition, the module entry-point guard, and formal
testing with Python's standard-library `unittest` framework.

## Learning objectives

By completing the lesson, the student can:

- Define and call Python functions.
- Distinguish a parameter from an argument.
- Return a value instead of only printing it.
- Use local variables to hold intermediate results.
- Use early returns to stop evaluation after a failed rule.
- Compose small functions into a complete decision workflow.
- Use `if __name__ == "__main__":` to separate reusable code from execution.
- Write and run automated tests with `unittest`.
- Interpret test failures and correct code or test data.

## Technical concept explanation

### Functions, parameters, and arguments

A function gives a name to a reusable block of code. Values named in the
function definition are **parameters**. Values supplied when calling the
function are **arguments**.

```python
def is_port_allowed(port, minimum, maximum):
    return minimum <= port <= maximum

is_port_allowed(8443, 1, 65535)
```

Here, `port`, `minimum`, and `maximum` are parameters. `8443`, `1`, and
`65535` are arguments.

### Return values and local variables

`return` sends a value back to the caller and immediately ends the current
function call. A local variable exists inside the function where it is
assigned. In `evaluate_target`, `normalized_target` and `validation` are local
variables used to connect the smaller functions.

Printing and returning serve different purposes: `print()` displays text for a
person, while `return` gives data to other Python code. Returning structured
dictionaries makes the result easier to test and reuse.

### Guard clauses and function composition

A guard clause checks a failure condition and returns early. The evaluator
first rejects invalid target text, then an out-of-scope target, and then an
invalid port. Only data that passes every guard reaches the accepted result.

Function composition means building a larger operation from smaller functions.
`evaluate_target()` calls `normalize_target()`, `validate_target()`,
`is_target_allowed()`, and `is_port_allowed()` instead of duplicating their
logic.

### Module entry-point guard

```python
if __name__ == "__main__":
```

Python sets `__name__` to `"__main__"` when the file is executed directly.
When the test module imports the file, the guarded example does not run. The
tests can therefore call the functions without producing the program's report.

### Automated testing with `unittest`

`unittest.TestCase` provides assertions that compare observed and expected
behavior. For example, the first expression passed to `assertEqual` is the
observed value and the second is the expected value.

```python
self.assertEqual(normalize_target("  LAB.LOCAL  "), "lab.local")
```

Running discovery with `python -m unittest -v` imports files named `test*.py`,
finds test methods named `test_*`, executes them, and reports each result.

## Guided exercises completed

The student:

- Predicted function names, parameters, arguments, local variables, and return
  values.
- Wrote target normalization using `strip()` and `lower()`.
- Built validation functions for required target text, embedded spaces,
  allowlist membership, and inclusive port boundaries.
- Combined the functions with guard clauses in `evaluate_target()`.
- Returned structured dictionaries for accepted and rejected decisions.
- Added `print_report()` and the module entry-point guard.
- Ran individual tests and complete test discovery.
- Corrected an exact string mismatch (`Target` versus `target`).
- Corrected a missing import that caused `NameError`.
- Corrected malformed parameterized test data that caused type errors.

## Final project

The completed program accepts raw target text, a port, and an explicit target
allowlist. It normalizes the target, validates its syntax, enforces the
allowlist, checks the inclusive port range `1..65535`, and returns a structured
decision and reason.

Expected baseline output:

```text
Target: training-api.local
Port: 8443
Decision: accepted
Reason: target and port passed all checks
```

## Run the program

```powershell
python scope_validator.py
```

## Automated tests

Run the complete suite:

```powershell
python -m unittest -v
```

The final run passed all six test methods. The parameterized checks cover 11
effective cases:

- Whitespace removal and lowercase normalization
- Empty target rejection
- Target-with-spaces rejection
- Port boundaries `1`, `65535`, `0`, and `65536`
- Valid integrated input
- Empty target, malformed target, out-of-allowlist target, low port, and high
  port rejection paths

Final result:

```text
Ran 6 tests in 0.001s

OK
```

## Git packaging commands

```powershell
# Run tests before packaging.
python -m unittest -v

# Inspect the repository.
git status --short --ignored

# Stage only the project source, tests, documentation, and ignore rules.
git add -- .gitignore README.md scope_validator.py test_scope_validator.py

# Review the staged snapshot.
git diff --cached --stat
git diff --cached --check

# Create the local project commit.
git commit -m "Add tested functional scope validator"

# Verify the commit and clean working tree.
git log --oneline -1
git status
```

The verified local project snapshot was commit
`5136d63 Add tested functional scope validator`. It was then packaged under
`week2-day6-scope-validator/` in the online course repository.

## Official documentation

- Python functions and control flow: https://docs.python.org/3/tutorial/controlflow.html#defining-functions
- Python modules and `__main__`: https://docs.python.org/3/tutorial/modules.html#executing-modules-as-scripts
- Python `unittest`: https://docs.python.org/3/library/unittest.html
- Python expressions and comparisons: https://docs.python.org/3/reference/expressions.html#comparisons

## Student solution

The completed solution is in [`scope_validator.py`](scope_validator.py). It
contains the student's normalization, validation, allowlist, boundary,
evaluation, and reporting functions. The corresponding automated tests are in
[`test_scope_validator.py`](test_scope_validator.py).

## Completion record

- Lesson exercises completed.
- Final program executed successfully.
- Six automated test methods passed.
- Git package verified without whitespace errors.
- Project published to the online course repository.
