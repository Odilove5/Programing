# Python + AI Software Engineering — MarketingOps AI

A local-first, project-driven programming course that grows from Python foundations into an Autonomous AI Marketing Operations Agent. The student writes the implementations; the course supplies explanations, focused examples, prediction questions, exercises, tests, progressive hints, and separate reference material.

## Current student checkpoint

- Week 1: complete.
- Week 2: complete.
- Week 3 Day 1: in progress.
- Resume at the bounded `range()` exercise in `cli-sessions/week-03-day-01.md`.
- Complete `range()`, `while` loops, state changes, termination conditions, infinite-loop prevention, loop choice, and termination tests before starting the MarketingOps bridge checkpoint.

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

## Learning workflow

Each lesson aims to provide a concept explanation, small worked example, prediction questions, student implementation, tests or acceptance criteria, progressively stronger hints, a separate reference solution when appropriate, and “What this unlocks in MarketingOps AI.” Periodic blank-file exercises provide only requirements and tests.

## Run the dashboard

Requirements: Node.js 22.13 or newer and npm.

```bash
cd dashboard
npm install
npm run build
npm run start
```

Open <http://127.0.0.1:3000>. Durable local progress is stored in `dashboard/.data/offsec-bootcamp.sqlite`; the legacy filename is retained to avoid a destructive progress migration.

## Preserved CLI

Python 3.10 or newer is required.

```bash
python study_coach.py --start 2026-08-07 --minutes 90 today
python study_coach.py dashboard
```

The CLI uses `curriculum.json` and `.study-progress.json`. The dashboard uses its richer generated curriculum and versioned SQLite state. Both progress stores remain intact.

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

## Repository guidance

- [Coaching and engineering rules](AGENTS.md)
- [Course roadmap](docs/COURSE_ROADMAP.md)
- [Curriculum authoring](docs/CURRICULUM_AUTHORING.md)
- [Data model](docs/DATA_MODEL.md)
- [Testing](docs/TESTING.md)
- [MarketingOps architecture](docs/AUTONOMOUS_MARKETINGOPS_ARCHITECTURE.md)

Completed security-themed exercises remain as evidence of foundational Python, validation, testing, and Git skills. Future lessons use business and marketing contexts except where security principles directly support safe software and AI engineering.
