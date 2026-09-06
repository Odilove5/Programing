# Learning-platform architecture

This repository is a single-student, local-first Python and AI software engineering course whose cumulative product is an Autonomous MarketingOps Agent.

## Components

- `dashboard/`: TypeScript lesson and progress application.
- `dashboard/lib/curriculum.ts`: canonical 252-record web curriculum.
- `dashboard/.data/offsec-bootcamp.sqlite`: preserved local progress store; its legacy filename avoids a destructive migration.
- `study_coach.py`, `curriculum.json`, `course_catalog.py`, and `course_content.py`: preserved CLI learning path.
- `workspace/`: student-owned exercises and nested Git histories.
- `cli-sessions/` and `lesson-archives/`: historical learning evidence.
- `docs/AUTONOMOUS_MARKETINGOPS_ARCHITECTURE.md`: capstone architecture.

Curriculum is deterministic and build validated. Student state is mutable and versioned separately. Progress counts six required lessons per week and excludes optional Day 7 retrieval records. Stable lesson IDs preserve existing completion, confidence, note, and session relationships.

The product enforces proposal -> validation -> policy -> approval when required -> deterministic adapter -> evidence. The learning platform must not implement exercise answers on the student's behalf.

