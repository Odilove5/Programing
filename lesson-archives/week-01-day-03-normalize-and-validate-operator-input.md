# CLI Training Archive: Normalize and validate operator input

Week 1, Day 3 · Python automation

## Technical lesson overview

This lesson introduces normalize and validate operator input before asking you to write commands or code. First build a mental model of the vocabulary and data flow below. You will then see the notion in a realistic authorized-lab situation, explain it in your own words, complete small guided checks, and finally build a project from a blank editor.

## Learning objectives

- Explain normalize and validate operator input in plain language
- Implement a small python automation example without copying
- Test normal, boundary, and failure behavior
- Connect the result to defensive validation and evidence quality

## Technical concept explanation

### Technical lesson

Begin by running Python interactively and then saving the same statements in a script. Python values have types such as int, float, str, bool, and NoneType; variables are names bound to those values. Arithmetic operators produce numeric results, while strings support indexing, slicing, concatenation, and formatted output. input() always returns text, so conversion belongs at the boundary. For a target normalizer, collect one line, strip surrounding whitespace, reject an empty value, and print a structured preview before writing anything.

### How to practise Normalize and validate operator input

Turn the weekly Python idea into automation with a clear boundary: parse and validate input, perform one operation, return structured output, and report a specific error. Add dry-run, timeout, or allowlist enforcement wherever a side effect or external resource is involved.

### Build the security-tool component

Build normalize and validate operator input as a small data pipeline: accept a local value, validate its shape, transform it, and print or save a structured result. Use modern Python 3 syntax, precise exceptions, and a fixture that cannot contact a network. The objective is independent coding fluency, not memorizing a recipe.

## CLI course content and completed exercises

### Learning progression

The session distinguished normalization from validation. Normalization makes equivalent input consistent; validation decides whether the normalized value satisfies format, safety, and authorization rules. The working data flow was:

```text
raw input -> strip whitespace -> lowercase -> reject empty -> check allowlist -> report
```

The student normalized `"    LAB-SERVER.LOCAL   "` with `.strip().lower()` and verified that spaces-only input becomes the empty string. Python truthiness was used to understand why an empty string follows the invalid branch.

An explicit set containing `lab-server.local` and `training-api.local` represented authorized scope. Membership with `in` was kept separate from the non-empty check so an arbitrary production hostname could not be authorized merely because it was formatted correctly.

Finally, the decision was stored in `status` and combined with the original and normalized values in a dictionary. This produced structured output suitable for later JSON reporting.

### Exercises completed

1. Classify valid, normalization-needed, and empty inputs.
2. Explain why normalized input still requires authorization validation.
3. Put normalization, empty rejection, allowlist checking, and reporting in the correct order.
4. Normalize a fictional hostname with `.strip()` and `.lower()`.
5. Test the truthiness of normal and spaces-only input.
6. Build an `if`/`elif`/`else` allowlist decision.
7. Store the status in a variable and produce a structured dictionary.
8. Run already-normalized, whitespace, empty, and outside-scope test cases.

### Errors debugged

- Corrected `.local()` to `.lower()`.
- Replaced a non-empty test that incorrectly authorized every value with an explicit membership check.
- Corrected assignment/comparison confusion and restored missing colons.
- Corrected a variable name containing a space to `normalized_target`.
- Added quotation marks around report messages.
- Corrected a mismatched `}` in the final `print()` call.

### Test evidence

| Raw input | Normalized value | Status |
|---|---|---|
| `"training-api.local "` | `"training-api.local"` | `authorized` |
| `"    LAB-SERVER.LOCAL   "` | `"lab-server.local"` | `authorized` |
| `"      "` | `""` | `invalid` |
| `"production-server.example"` | `"production-server.example"` | `outside allowlist` |

The student independently wrote the final decision and explained why correct formatting does not establish authorization.

### Student exercise record

Normalization exercise:

```python
raw_target = "    LAB-SERVER.LOCAL   "
normalized_target = raw_target.strip().lower()

print(f'Original: "{raw_target}"')
print(f'Normalized: "{normalized_target}"')
```

Empty-input decision:

```python
if normalized_target:
    print("The target contains a value.")
else:
    print("Invalid: the target is empty.")
```

Allowlist decision completed by the student:

```python
allowed_targets = {"lab-server.local", "training-api.local"}
raw_target = "production-server.example"
normalized_target = raw_target.strip().lower()

if not normalized_target:
    status = "invalid"
elif normalized_target in allowed_targets:
    status = "authorized"
else:
    status = "outside allowlist"

print(status)
```

Structured-output exercise:

```python
result = {
    "input": raw_target,
    "normalized": normalized_target,
    "status": status,
}
print(result)
```

## Student solution

```python
allowed_targets = {"lab-server.local", "training-api.local"}
raw_target = "production-server.example"
normalized_target = raw_target.strip().lower()

if not normalized_target:
    status = "invalid"
elif normalized_target in allowed_targets:
    status = "authorized"
else:
    status = "outside allowlist"

result = {"input": raw_target, "normalized": normalized_target, "status": status}
print(result)
```

## Student notes

Completed normalization, empty-input rejection, explicit allowlist validation, structured results, and four input cases.

## Completion record

- Lesson completed in the local study platform.
- CLI exercises and final student solution captured.
- Archive regenerated: 2026-08-12T14:29:49.780Z
