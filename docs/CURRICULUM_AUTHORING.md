# Curriculum authoring guide

`course_catalog.py` is the canonical source for course structure, stable lesson
IDs, student-facing titles, descriptive slugs, prerequisites, weekly outcomes,
daily outcomes, projects, and content-readiness status. Run
`python3 tools/export_course_lessons.py` after changing that metadata.

The export generates `course-lessons/curriculum-manifest.json`,
`dashboard/lib/canonical-manifest.ts`, the root curriculum index, every week
overview, and lesson navigation. Do not edit those representations as separate
curricula. `dashboard/lib/curriculum.ts` enriches the generated manifest with
interactive lesson presentation, while `curriculum.json` remains a legacy CLI
compatibility view pending a non-destructive migration.

The dashboard schema requires 252 stable records: 36 weeks, six required
lessons, and one optional retrieval day per week.

Never renumber existing `week-NN-day-NN` IDs. Completion and checkpoint
records belong to individual local learners and are never embedded in the
public curriculum metadata.

Course readiness is explicit per lesson in `course_catalog.py`. `Draft`,
`Authored`, and `Validated` describe public teaching material; they never
describe a learner's progress. Mark a lesson `Validated` only after its
examples, exercise, tests, solution, links, accessibility, and beginner
readability have all been reviewed.

## Required lesson design

Use granular concepts, a small worked example, prediction questions, a student-written exercise, acceptance criteria or tests, progressive hints, and a clear “What this unlocks in MarketingOps AI” connection. Keep reference solutions separate. Blank-file retrieval exercises provide requirements and tests but no starter implementation.

Build one current capability at a time. Do not introduce an AI framework before the student understands the Python, data, API, persistence, and testing mechanics it would abstract.

## Architecture invariants

- Deterministic Python owns KPIs, validation, budgets, and policy.
- Model output is untrusted proposed data.
- There is no LLM-to-external-action path.
- Policy and required human approval precede deterministic adapter execution.
- Use fixtures and mock connectors before live credentials.
- Record evidence and test normal, boundary, malformed, denied, timeout, and duplicate behavior.

Prefer narrow official documentation and original summaries. Run Python tests, dashboard type checking, lint, curriculum tests, and the production build after curriculum changes.
