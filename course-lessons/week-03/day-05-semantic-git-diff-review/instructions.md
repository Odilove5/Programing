# Week 03, Day 05: Semantic Git Diff Review

**Content status:** Authored
**Required:** Yes
**Estimated time:** 60 minutes

## Why this lesson matters

A clean diff tells a reviewer what changed and why. This lesson applies the loop-boundary mindset to Git: inspect the meaningful lines, separate noise, and verify that tests changed with the behavior. It prepares you to package course projects without hiding accidental edits.

## What you will learn

By the end of this lesson, you will be able to:

- Explain and apply semantic change.
- Explain and apply noise.
- Explain and apply focused diff.
- Explain and apply review evidence.

## Concepts

### Semantic change

A line that changes program behavior, tests, or documentation intentionally.

### Noise

Generated files, line-ending changes, and OS metadata that obscure meaning.

### Focused diff

A diff limited to the current lesson's files.

### Review evidence

A short note connecting the diff to the acceptance criteria.

## Syntax

`git diff --stat`

`git diff --check`

`git diff --cached -- path`

## Worked examples

```python
diff = ["+attempt += 1", "+print(secret)"]
print([line for line in diff if "secret" not in line])
```

**Expected output**

```text
['+attempt += 1']
```

**Notice:** Review can identify unsafe output before a commit.
```python
files = ["exercise.py", "test_exercise.py", ".DS_Store"]
print([f for f in files if f.endswith(".py")])
```

**Expected output**

```text
['exercise.py', 'test_exercise.py']
```

**Notice:** The expected artifact set is explicit.

## MarketingOps example

```python
changed = ["campaign_rules.py", "campaign_rules_test.py", "report.json"]
print({"semantic": changed[:2], "noise_or_output": changed[2:]})
```

**Expected output**

```text
{'semantic': ['campaign_rules.py', 'campaign_rules_test.py'], 'noise_or_output': ['report.json']}
```

**Notice:** Generated reports can be preserved locally without becoming source.

This fictional example reinforces the Python concept. It does not call a live API, use credentials, or authorize an external action.

## Common mistakes and failure cases

- Calling all changed lines noise without reading them.
- Committing a report instead of the code and test that produced it.
- Ignoring whitespace errors detected by `git diff --check`.

## Check your understanding

1. Which files belong to the lesson?
2. What makes a change semantic?
3. Why review staged and unstaged diffs separately?

<details>
<summary>Explanations after you predict</summary>

1. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
2. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.
3. Review the boundary and input contract is correct because it follows the concrete input/output contract practiced in this lesson.

</details>

## Quiz

1. **What does `git diff --check` find?**
   - a) Whitespace errors
   - b) Python types
   - c) API results
2. **Which artifact is usually generated?**
   - a) A source module
   - b) A report JSON
   - c) A test assertion

<details>
<summary>Answer key and explanations</summary>

1. **a** — a is correct because it follows the concrete input/output contract practiced in this lesson.
2. **b** — b is correct because it follows the concrete input/output contract practiced in this lesson.

</details>

## Exercise handoff

Create a review report from a supplied list of changed files. Classify semantic source/test files versus generated/noise files and write the exact Git commands a learner should run before committing.

Open [`exercise.py`](exercise.py) and write the implementation yourself. Run:

```bash
python exercise.py
python -m unittest -v
```

The exercise must cover normal input, at least one boundary, and the failure or malformed case named above. Use the hints in the exercise file only after your first attempt. Inspect [`solution.py`](solution.py) only after your tests run or you can explain the remaining failure.

## Weekly project connection

This contributes to the Week 03 project by making `a blank-file campaign rules checker` more testable and reviewable.

## Official reading

[git diff](https://git-scm.com/docs/git-diff) — read the syntax and boundary behavior used in this lesson.

## Navigation

[← Previous lesson](../../week-03/day-04-loop-boundary-tests/instructions.md) · [Week overview](../README.md) · [Full curriculum](../../README.md) · [Next lesson →](../../week-03/day-06-campaign-rules-checker/instructions.md)
