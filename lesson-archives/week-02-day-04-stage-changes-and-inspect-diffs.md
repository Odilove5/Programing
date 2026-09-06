# CLI Training Archive: Stage changes and inspect diffs

Week 2, Day 4 · Git & GitHub

## Technical lesson overview

This lesson examined how Git represents changes across the working tree,
staging area, and repository history. The student deliberately moved one README
change through multiple states, inspected each state with the appropriate diff,
unstaged without deleting work, used interactive patch staging, validated the
proposed snapshot, and committed only after review.

## Learning objectives

By completing this lesson, the student demonstrated the ability to:

- Explain the working tree, staging area, and committed repository.
- Interpret both columns of `git status --short`.
- Inspect unstaged content with `git diff`.
- Stage a specific tracked file with `git add`.
- Inspect staged content with `git diff --cached`.
- Recognize a file with simultaneous staged and unstaged changes.
- Unstage content with `git restore --staged` without deleting edits.
- Use `git add -p` to review and stage a patch interactively.
- Check a staged snapshot for whitespace errors.
- Commit and verify the exact reviewed snapshot.

## Technical concept explanation

Git maintains three relevant versions of a tracked file:

```text
HEAD commit -> staging area -> working tree
```

The working tree is the editable file on disk. The staging area is the proposed
next snapshot. `HEAD` normally identifies the current committed snapshot.

Short status uses two columns:

```text
XY filename
```

`X` describes the difference between `HEAD` and the staging area. `Y` describes
the difference between the staging area and working tree. Therefore:

```text
 M README.md  modified only in the working tree
M  README.md  modified and staged
MM README.md  staged, then modified again
```

`git diff` compares the working tree with the staging area. `git diff --cached`
compares the staging area with `HEAD`. A commit records the staged snapshot,
not every file currently modified on disk.

### Guided Git course content and completed exercises

### Clean starting state

The student entered the isolated Day 3 project repository and ran:

```powershell
git status
```

Observed result:

```text
On branch master
nothing to commit, working tree clean
```

### Inspecting an unstaged modification

The student added a `Validation order` section to `README.md`. Short status
reported:

```text
 M README.md
```

The student inspected the content with:

```powershell
git diff -- README.md
```

The diff showed added content with a single `+` prefix. The `+++ b/README.md`
line was identified as file metadata rather than an added README line.

### Staging and comparing diffs

```powershell
git add -- README.md
git status --short
```

Observed staged state:

```text
M  README.md
```

`git diff -- README.md` produced no output because the working tree matched the
staging area. `git diff --cached -- README.md` showed the staged validation
section because it compared the staging area with the latest commit.

### Simultaneous staged and unstaged changes

The student added a second README sentence after staging. Status became:

```text
MM README.md
```

`git diff --cached` showed the staged validation section, while `git diff`
showed only the newer JSON-report sentence.

### Unstaging and patch mode

```powershell
git restore --staged README.md
git status --short
```

Status returned to:

```text
 M README.md
```

Both edits remained in the working file. The student then used:

```powershell
git add -p README.md
```

and answered `y` to stage the displayed hunk. Because the edits were adjacent,
Git presented them as one patch. Status returned to `M  README.md`.

### Staged validation and commit

```powershell
git diff --cached --check
git diff --cached --stat
git diff --cached -- README.md
```

The whitespace check produced no output. The statistical summary reported one
file with nine insertions, and the full staged diff contained both additions.

The student committed and verified the snapshot:

```powershell
git commit -m "Document validation order"
git log --oneline -1
git status
```

Observed commit:

```text
01b549e (HEAD -> master) Document validation order
```

Final status:

```text
On branch master
nothing to commit, working tree clean
```

### Automated final verification

The final checks confirmed:

- `git status --porcelain` returned no entries.
- The history contains `01b549e` after the original `9eae467` project commit.
- The README contains both intended additions.
- `git show --check --stat HEAD` reported no commit whitespace error.

### Official documentation

- Pro Git, Recording Changes: https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository
- `git status`: https://git-scm.com/docs/git-status
- `git diff`: https://git-scm.com/docs/git-diff
- `git add`: https://git-scm.com/docs/git-add
- `git restore`: https://git-scm.com/docs/git-restore
- `git commit`: https://git-scm.com/docs/git-commit
- `git log`: https://git-scm.com/docs/git-log

## CLI course content and completed exercises

No guided CLI exercises have been recorded yet.

## Student solution

```shell
git status
git diff -- README.md
git add -- README.md
git diff --cached -- README.md
git restore --staged README.md
git add -p README.md
git diff --cached --check
git commit -m "Document validation order"
git log --oneline -1
git status

Verified commit: 01b549e Document validation order
```

## Student notes

Completed Git working-tree, staging-area, diff, unstage, patch staging, review, commit, and verification exercises.

## Completion record

- Lesson completed in the local study platform.
- CLI exercises and final student solution captured.
- Archive regenerated: 2026-08-12T18:36:40.831Z
