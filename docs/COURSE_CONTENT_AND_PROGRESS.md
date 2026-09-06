# Course content and learner progress

This repository publishes a reusable course. It is not a personal progress
tracker or portfolio.

## Public and version-controlled

- Curriculum structure and lesson metadata
- Instructions, starter exercises, tests, references, and fictional fixtures
- Dashboard application code and reusable progress functions
- Empty database schemas and migrations
- Demo data explicitly labeled `Demo`

## Local and ignored

- Completion, checkpoints, confidence, reflections, and scores
- Personal CLI sessions and lesson archives
- Local progress databases and exported state
- Generated evidence and student-specific outputs

A fresh clone starts with an empty learner profile. On first launch, choose
**Start course** in the dashboard. Returning learners resume from their own
local database or import an export they own. Progress is never inferred from
exercise files, project directories, or Git history.

Course-content readiness (`Draft`, `Authored`, `Validated`) is separate from
learner state (`Not started`, `In progress`, `Completed`, `Assessed`, and
`Mastered`).

The repository currently contains tracked historical files under
`cli-sessions/`, `lesson-archives/`, and parts of `workspace/`. They are not
used by the dashboard and are documented rather than deleted automatically.
The owner should decide whether to move them to a private, history-preserving
archive and then remove them from the public repository.

`workspace/` is mixed: some directories are reusable starter projects and
tests, while older directories contain completed student submissions or local
reports. Check each directory README before presenting it as reference
material.
