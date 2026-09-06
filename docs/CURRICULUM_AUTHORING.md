# Curriculum authoring guide

The canonical web curriculum is generated in `dashboard/lib/curriculum.ts`. The CLI uses `curriculum.json` plus `course_catalog.py`. Keep their phase and week intent aligned. The dashboard schema requires 252 stable records: 36 weeks, six required lessons, and one optional retrieval day per week.

Never renumber existing `week-NN-day-NN` IDs. Weeks 1 and 2 are completed history, and Week 3 Day 1 remains active until its loop checkpoint is complete.

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

