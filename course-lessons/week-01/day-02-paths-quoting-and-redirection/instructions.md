# Week 01, Day 02: Paths, Quoting, and Redirection

**Content status:** Authored
**Required:** Yes
**Estimated time:** 45 minutes

## Why this lesson matters

Shell commands are programs that receive text arguments. Quoting controls where one argument starts and ends, while paths identify files and directories. You learn this now because course exercises and later data pipelines must be reproducible on paths containing spaces without accidentally writing outside the workspace.

## What you will learn

By the end of this lesson, you will be able to:

- Separate command arguments safely.
- Explain how quoting preserves arguments.
- Construct safe relative paths.
- Compare replace and append writes.

## Concepts

### Arguments

A command receives a list of arguments; spaces normally separate arguments.

### Quoting

Single and double quotes preserve spaces, with different expansion behavior.

### Paths

Relative paths depend on the working directory; explicit paths make file operations easier to review.

### Redirection

`>` replaces a file, while `>>` appends. Treat redirection as a write with side effects.

## Syntax

`command "path with spaces/file.txt"`

`command > output.txt`

`command >> log.txt`

## Worked examples

```python
from pathlib import Path
path = Path("lab data") / "campaign.txt"
print(path)
```

**Expected output**

```text
lab data/campaign.txt
```

**Notice:** `Path` joins components without hand-written slash escaping.
```python
from pathlib import Path
output = Path("demo-output.txt")
output.write_text("one\n", encoding="utf-8")
output.write_text(output.read_text(encoding="utf-8") + "two\n", encoding="utf-8")
print(output.read_text(encoding="utf-8"), end="")
```

**Expected output**

```text
one
two
```

**Notice:** Writing is a side effect; encoding and the destination should be explicit.

## MarketingOps example

```python
from pathlib import Path
fixture = Path("fixtures") / "campaigns.json"
print(f"Read-only fixture path: {fixture}")
```

**Expected output**

```text
Read-only fixture path: fixtures/campaigns.json
```

**Notice:** A connector can be pointed at a saved fixture before live credentials exist.

This fictional example reinforces the Python concept. It does not call a live API, use credentials, or authorize an external action.

## Common mistakes and failure cases

- Splitting a path with spaces into multiple shell arguments.
- Using `>` when you meant to append evidence.
- Assuming a relative path is independent of the current directory.

## Check your understanding

1. Why quote a path containing spaces?
2. What is the difference between `>` and `>>`?
3. Why is `pathlib` safer than string concatenation?

<details>
<summary>Explanations after you predict</summary>

1. Review the boundary and input contract is correct because paths and shell writes are boundaries where argument splitting and side effects must be explicit.
2. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
3. Review the boundary and input contract is correct because paths and shell writes are boundaries where argument splitting and side effects must be explicit.

</details>

## Quiz

1. **Which object joins path components?**
   - a) `Path`
   - b) `print`
   - c) `input`
2. **Which redirection appends?**
   - a) `>`
   - b) `>>`
   - c) `|`

<details>
<summary>Answer key and explanations</summary>

1. **a** — a is correct because paths and shell writes are boundaries where argument splitting and side effects must be explicit.
2. **b** — b is correct because paths and shell writes are boundaries where argument splitting and side effects must be explicit.

</details>

## Exercise handoff

Create a `Path` for a fictional campaign fixture inside `workspace/fixtures`, print the resolved relative components, and write a dry-run report without reading or writing outside the lesson directory.

Open [`exercise.py`](exercise.py) and write the implementation yourself. Run:

```bash
python exercise.py
python -m unittest -v
```

The exercise must cover normal input, at least one boundary, and the failure or malformed case named above. Use the hints in the exercise file only after your first attempt. Inspect [`solution.py`](solution.py) only after your tests run or you can explain the remaining failure.

## Weekly project connection

This contributes to the Week 01 project by making `an authorized-target report` more testable and reviewable.

## Official reading

[Python pathlib](https://docs.python.org/3/library/pathlib.html) — read the syntax and boundary behavior used in this lesson.

## Navigation

[← Previous lesson](../../week-01/day-01-values-types-input-and-output/instructions.md) · [Week overview](../README.md) · [Full curriculum](../../README.md) · [Next lesson →](../../week-01/day-03-normalization-and-validation/instructions.md)
