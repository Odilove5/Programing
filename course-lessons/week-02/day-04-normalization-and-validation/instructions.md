# Week 02, Day 04: Stage Changes and Inspect Diffs

**Content status:** Authored
**Required:** Yes
**Estimated time:** 50 minutes

## Why this lesson matters

Staging is a deliberate boundary between edits and a Git snapshot. A diff review catches accidental text changes, generated reports, and unrelated exercise edits. This lesson turns Git commands into a repeatable quality check.

## What you will learn

By the end of this lesson, you will be able to:

- Explain and apply diff.
- Explain and apply selective staging.
- Explain and apply noise.
- Explain and apply review.

## Concepts

### Diff

A diff shows additions and removals relative to a baseline.

### Selective staging

Stage only files belonging to the learning outcome.

### Noise

Line-ending changes, caches, and reports can obscure the semantic change.

### Review

Read the staged diff before committing.

## Syntax

`git diff -- path`

`git diff --cached`

`git status --short`

## Worked examples

```python
changes = ["exercise.py", "__pycache__/exercise.pyc", ".DS_Store"]
print([path for path in changes if not path.startswith("__pycache__") and path != ".DS_Store"])
```

**Expected output**

```text
['exercise.py']
```

**Notice:** Filtering noise is part of a focused review.
```python
diff_lines = ["+return decision", "+print(secret)"]
print([line for line in diff_lines if "secret" not in line])
```

**Expected output**

```text
['+return decision']
```

**Notice:** A review should catch unsafe output before commit.

## MarketingOps example

```python
files = ["campaign_metrics.py", "campaign_metrics_test.py", "report.json"]
print({"course": [f for f in files if f.endswith(".py")], "review": "exclude generated report"})
```

**Expected output**

```text
{'course': ['campaign_metrics.py', 'campaign_metrics_test.py'], 'review': 'exclude generated report'}
```

**Notice:** Generated marketing reports are evidence, not always source.

This fictional example reinforces the Python concept. It does not call a live API, use credentials, or authorize an external action.

## Common mistakes and failure cases

- Using `git diff` after staging and assuming it shows staged changes.
- Committing generated files because they appear in status.
- Reviewing only filenames instead of content.

## Check your understanding

1. Which diff shows staged content?
2. Why exclude caches?
3. What makes a commit focused?

<details>
<summary>Explanations after you predict</summary>

1. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
2. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
3. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.

</details>

## Quiz

1. **Which command shows staged diff?**
   - a) `git diff --cached`
   - b) `python diff`
   - c) `git log --empty`
2. **What is semantic noise?**
   - a) A meaningful rule
   - b) Generated or unrelated changes
   - c) A test assertion

<details>
<summary>Answer key and explanations</summary>

1. **a** — a is correct because it follows the concrete input/output contract practiced in this lesson.
2. **b** — b is correct because it follows the concrete input/output contract practiced in this lesson.

</details>

## Exercise handoff

Write a `diff_review.py` helper that classifies filenames as source, test, generated, or OS noise. Include a short review checklist in its output.

Open [`exercise.py`](exercise.py) and write the implementation yourself. Run:

```bash
python exercise.py
python -m unittest -v
```

The exercise must cover normal input, at least one boundary, and the failure or malformed case named above. Use the hints in the exercise file only after your first attempt. Inspect [`solution.py`](solution.py) only after your tests run or you can explain the remaining failure.

## Weekly project connection

This contributes to the Week 02 project by making `a scope decision tool` more testable and reviewable.

## Official reading

[Python string methods](https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str) — read the syntax and boundary behavior used in this lesson.

## Navigation

[← Previous lesson](../../week-02/day-03-validation-with-conditional-branches/instructions.md) · [Week overview](../README.md) · [Full curriculum](../../README.md) · [Next lesson →](../../week-02/day-05-functions-and-basic-tests/instructions.md)
