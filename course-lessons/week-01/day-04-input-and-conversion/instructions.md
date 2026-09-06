# Week 01, Day 04: Create a Repository and Make Useful Commits

**Content status:** Authored
**Required:** Yes
**Estimated time:** 90 minutes

## Why this lesson matters

Git records intentional snapshots of a project. A useful commit explains one change and lets another learner reproduce or review it. You are learning this alongside Python so every later exercise has a visible, recoverable history instead of a folder full of unexplained edits.

## What you will learn

By the end of this lesson, you will be able to:

- Files changed but not yet staged are in the working tree.
- `git add` selects the exact changes for the next snapshot.
- A commit records staged content with a message and parent history.
- Inspect the diff before committing to catch generated files, secrets, and accidental edits.

## Concepts

### Working tree

Files changed but not yet staged are in the working tree.

### Staging area

`git add` selects the exact changes for the next snapshot.

### Commit

A commit records staged content with a message and parent history.

### Diff review

Inspect the diff before committing to catch generated files, secrets, and accidental edits.

## Syntax

`git status --short`

`git diff`

`git add path/to/file`

`git commit -m "Explain one change"`

## Worked examples

```python
from pathlib import Path
Path("change.txt").write_text("one focused change\n", encoding="utf-8")
print("Review this file before staging it")
```

**Expected output**

```text
Review this file before staging it
```

**Notice:** Git is separate from Python execution; inspect the artifact before recording it.
```python
changed = ["exercise.py", "test_exercise.py"]
for path in changed:
    print(f"review: {path}")
```

**Expected output**

```text
review: exercise.py
review: test_exercise.py
```

**Notice:** A focused commit names the files that belong to one learning outcome.

## MarketingOps example

```python
files = ["campaign_parser.py", "test_campaign_parser.py", ".DS_Store"]
for path in files:
    print("include" if path.endswith(".py") else "exclude", path)
```

**Expected output**

```text
include campaign_parser.py
include test_campaign_parser.py
exclude .DS_Store
```

**Notice:** Generated or machine-specific files do not belong in a course commit.

This fictional example reinforces the Python concept. It does not call a live API, use credentials, or authorize an external action.

## Common mistakes and failure cases

- Committing every changed file without reviewing the diff.
- Using a vague message such as `updates`.
- Treating line-ending noise or `.DS_Store` as lesson content.

## Check your understanding

1. What does staging let you control?
2. Which command shows unstaged changes?
3. Why should a commit be focused?

<details>
<summary>Think through the questions</summary>

Try the examples and write predictions before opening the reference file.

</details>

## Quiz

1. **Which area does `git add` select?**
   - a) Working tree
   - b) Staging area
   - c) Remote server
2. **What should happen before commit?**
   - a) Review the diff
   - b) Delete tests
   - c) Add credentials

<details>
<summary>Answer key and explanations</summary>

1. **b** — The correct choice follows the rule taught above.
2. **a** — The correct choice follows the rule taught above.

</details>

## Exercise handoff

Create a small `CHANGELOG.md` entry for one lesson change. Use `git status`, inspect the diff, stage only the intended file, and write a meaningful commit message. Do not commit generated files.

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

[← Previous lesson](../../week-01/day-03-strings-integers-and-booleans/instructions.md) · [Week overview](../README.md) · [Full curriculum](../../README.md) · [Next lesson →](../../week-01/day-05-tracebacks-and-handled-errors/instructions.md)
