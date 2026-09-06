# Python + AI Software Engineering — MarketingOps AI

A project-driven Python and AI Software Engineering course that grows from
programming foundations into an Autonomous MarketingOps AI capstone. Learners
write the implementations; the course supplies explanations, focused
examples, prediction questions, exercises, tests, progressive hints, and
separate reference material.

This public repository contains reusable course content, not one learner's
completion record. New learners begin at Week 1 Day 1. Returning learners
resume from their own ignored local progress store. Progress is never inferred
from exercise files or project directories.

The migration preserves the 36-week, seven-day calendar and all `week-NN-day-NN` identifiers so saved progress remains valid. Day 7 is optional retrieval/recovery; the other six days are required.

## Capstone

The final product is an **Autonomous AI Marketing Operations Agent** that works toward a bounded goal such as:

> In 60 days, increase qualified leads by 25% while maintaining CPA below the configured limit and staying within the approved advertising budget.

Its governing flow is:

```text
Business goal -> Planner -> Data collection -> Deterministic KPI analysis
-> AI recommendation -> Policy validation -> Human approval when required
-> Deterministic execution -> Evidence capture -> Outcome measurement
-> Next iteration
```

Model output never has unrestricted access to external actions. AI proposes; typed deterministic code validates; policy authorizes; a human approves when required; a narrow adapter executes; evidence records the result.

## Course phases

0. Existing foundations and MarketingOps bridge
1. Python for marketing data
2. Reliable business logic and data models
3. APIs and business data integration
4. Backend and persistence
5. LLM engineering
6. Tools, agents, and orchestration
7. Policy engine and human oversight
8. Autonomous MarketingOps capstone

See the [course roadmap](docs/COURSE_ROADMAP.md), [capstone architecture](docs/AUTONOMOUS_MARKETINGOPS_ARCHITECTURE.md), and [migration mapping](docs/MIGRATION_TO_MARKETINGOPS.md).

See the complete [daily curriculum index](course-lessons/README.md), with a
week overview and links to every lesson.

## Learning workflow

Each lesson aims to provide a concept explanation, small worked example, prediction questions, student implementation, tests or acceptance criteria, progressively stronger hints, a separate reference solution when appropriate, and “What this unlocks in MarketingOps AI.” Periodic blank-file exercises provide only requirements and tests.

The [curriculum index](course-lessons/README.md) labels readiness honestly:
Weeks 1–2 are **Authored**, Week 3 is **Authored (partial)**, and later weeks
remain **Draft** until they receive subject-specific teaching content,
aligned tests, and a working reference solution. A lesson's content status is
not a learner's progress status.

### GitHub lesson format

The complete 36-week catalog is also available as a browsable lesson mirror in
[`course-lessons/`](course-lessons/). Every canonical lesson keeps the same
stable week/day identifier and has the same three-file workflow:

```text
course-lessons/week-03/day-01-lists-for-loops-range-and-while-termination/
├── instructions.md  # read this first
├── exercise.py      # intentionally incomplete student file
└── solution.py      # separate reference pattern, after your attempt
```

The dashboard remains the source of truth for progress and richer interactive
practice; the GitHub mirror makes every lesson easy to inspect, clone, and
review. Regenerate it with `python tools/export_course_lessons.py` after
curriculum metadata changes.

## Run the dashboard

Requirements: Node.js 22.13 or newer and npm.

```bash
cd dashboard
npm install
npm run build
npm run start
```

Open <http://127.0.0.1:3000>. On a fresh clone the dashboard shows **Start
course** and stores progress only in the local ignored database under
`dashboard/.data/`. Use the dashboard's export/reset controls to move or clear
your own learner state.

## Preserved CLI

Python 3.10 or newer is required.

```bash
python study_coach.py --start 2026-08-07 --minutes 90 today
python study_coach.py dashboard
```

The CLI uses the public curriculum plus a local ignored `.study-progress.json`.
The dashboard uses its richer generated curriculum and a local ignored SQLite
state. Personal sessions and archives under `cli-sessions/` and
`lesson-archives/` are local-only; historical tracked files in those
directories are documented for a future private archive decision.

## Verification

```bash
python -m unittest -v
cd dashboard
npm run typecheck
npm run lint
npm test
npm run build
```

Student exercise tests live beside their projects under `workspace/`. Do not run or rewrite reference solutions as a substitute for the student's attempt.

## Contributing

Open an issue or pull request with the lesson ID, technical source, examples
executed, tests run, and any accessibility or beginner-readability concerns.
Keep public fixtures fictional, keep learner state local, and do not add
credentials or personal evidence.

## Repository guidance

- [Coaching and engineering rules](AGENTS.md)
- [Course roadmap](docs/COURSE_ROADMAP.md)
- [Curriculum authoring](docs/CURRICULUM_AUTHORING.md)
- [Data model](docs/DATA_MODEL.md)
- [Testing](docs/TESTING.md)
- [MarketingOps architecture](docs/AUTONOMOUS_MARKETINGOPS_ARCHITECTURE.md)
- [Course content and learner progress](docs/COURSE_CONTENT_AND_PROGRESS.md)

Legacy security-themed examples are retained as optional teaching material for
validation, testing, and Git. Future lessons use business and marketing
contexts except where security principles directly support safe software and AI
engineering.
