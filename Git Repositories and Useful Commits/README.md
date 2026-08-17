# CLI Training Archive: Create a repository and useful commits

Week 1, Day 4 · Git & GitHub

## Technical lesson overview

This lesson introduces create a repository and useful commits before asking you to write commands or code. First build a mental model of the vocabulary and data flow below. You will then see the notion in a realistic authorized-lab situation, explain it in your own words, complete small guided checks, and finally build a project from a blank editor.

## Learning objectives

- Explain create a repository and useful commits in plain language
- Implement a small git & github example without copying
- Test normal, boundary, and failure behavior
- Connect the result to defensive validation and evidence quality

## Technical concept explanation

### Technical lesson

Begin by running Python interactively and then saving the same statements in a script. Python values have types such as int, float, str, bool, and NoneType; variables are names bound to those values. Arithmetic operators produce numeric results, while strings support indexing, slicing, concatenation, and formatted output. input() always returns text, so conversion belongs at the boundary. For a target normalizer, collect one line, strip surrounding whitespace, reject an empty value, and print a structured preview before writing anything.

### How to practise Create a repository and useful commits

Use Git as an evidence trail. Inspect the diff before staging, separate generated evidence from source code, write a commit message that explains why the change exists, and practice the week's branch, review, release, or recovery operation on disposable history.

## CLI course content and completed exercises

### Learning progression

The session began with a realistic version-control problem: both a validator and a password-containing note had changed, but only the validator belonged in the next checkpoint. The student correctly decided to stage only the intended source file because a changed file is not automatically safe or relevant to commit.

Git's three working areas were introduced gradually. The working tree contains current files, the staging area contains the changes selected for the next checkpoint, and repository history contains completed commits. A disposable repository was created under `workspace/day4-git-lab` so the main study repository was not altered.

The student used `git status` before staging, learned that `??` means untracked, and staged only `target_validator.py`. Reviewing `git diff --cached` exposed the exact snapshot prepared for the commit and confirmed the intended final output statement.

The first commit initially failed because Git had no author identity. A non-deliverable training identity was configured only inside the disposable repository, not globally. The reviewed validator was then committed successfully.

The lesson next introduced `.gitignore`. The student learned that `.gitignore` is a tracked project file containing ignore patterns, while `private-notes.txt` and generated `report.json` remain local. `!!` was identified as the ignored-file status. The ignore rules were reviewed and saved in a second focused commit.

Finally, the complete safe workflow was reconstructed one decision at a time: inspect status, stage the intended file, review the staged diff, create the commit, inspect history, and verify final status.

### Exercises completed

1. Decide which of two changed files belongs in version control.
2. Identify `git init` as the repository-initialization command.
3. Verify the intended working directory before initialization.
4. Predict the empty repository status.
5. Classify a new file as untracked.
6. Stage only `target_validator.py` by name.
7. Review the staged snapshot with `git diff --cached`.
8. Choose and create a meaningful first commit.
9. Configure a repository-local training identity after Git rejected an unknown author.
10. Explain the purpose and limitation of `.gitignore`.
11. Add ignore patterns for local notes and generated reports.
12. Interpret `??` as untracked and `!!` as ignored.
13. Stage and commit only `.gitignore`.
14. Reconstruct the safe status, add, diff, commit, log, and status workflow.
15. Correct the history option from `--cache` and `--online` to `--oneline`.

### Commands practiced

```bash
pwd
mkdir workspace/day4-git-lab
cd workspace/day4-git-lab
git init
git status
git add target_validator.py
git diff --cached -- target_validator.py
git config user.name "Odilon Nguemou"
git config user.email "odilon@local.invalid"
git commit -m "Add scoped target validator"
git add .gitignore
git diff --cached -- .gitignore
git commit -m "Ignore local notes and generated reports"
git log --oneline
git status
```

### Errors and misconceptions corrected

- Clarified that `git add` stages a file but does not create a commit.
- Corrected the commit-message spelling from `locla` to `local` before history was written.
- Explained that `.gitignore` itself is normally tracked and committed.
- Explained that adding an already committed secret to `.gitignore` does not remove it from history.
- Kept repository identity local rather than changing machine-wide Git configuration.
- Distinguished `git diff --cached` from `git log --oneline`.
- Corrected `--online` to `--oneline` using the mnemonic “one commit per line.”

### Commit evidence

```text
2a8bb81 Ignore local notes and generated reports
2b6ed09 Add scoped target validator
```

Ignored-file evidence:

```text
!! private-notes.txt
!! report.json
```

The normal final status contained only the branch header, confirming that tracked changes were committed while private and generated files remained ignored.

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
print(status)

```

## Student notes

Completed selective staging, staged-diff review, focused commits, local Git identity, and ignore rules.

## Completion record

- Lesson completed in the local study platform.
- CLI exercises and final student solution captured.
- Archive regenerated: 2026-08-12T14:29:49.817Z
