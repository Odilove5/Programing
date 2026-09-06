# Data model and progress portability

The local application stores one versioned, Zod-validated state document in SQLite. Typed relational table definitions for lesson progress, notes, bookmarks, and sessions live in `dashboard/db/schema.ts`; the compact state document keeps import/export atomic for the single-user release.

The state contains a student profile, application settings, lesson-progress records, quiz results, confidence, completion checklists, notes, confusing-concept flags, bookmarks, and study sessions. Curriculum is deterministic and is not duplicated in student exports.

Lesson states are `locked`, `available`, `in-progress`, `completed`, and `needs-review`. Required completion divides completed required lessons by 216; day-seven review records never affect the percentage.

Exports are JSON with `version: 1`. The Settings page creates the file locally. Import parses JSON and validates the complete document before any database write. Invalid versions, malformed URLs, invalid confidence values, or incomplete records are rejected without replacing existing data.

The legacy `.study-progress.json` remains owned by `study_coach.py` and is
ignored locally. CLI completions are not inferred from repository files or
automatically mapped into another learner's dashboard state.

The MarketingOps migration retains every `week-NN-day-NN` identifier. New
course content never implies learner completion. Future project models such as Campaign,
MetricSnapshot, BusinessGoal, Recommendation, ActionRequest, Approval, and
Evidence are separate from the learning-progress document.

## Dashboard projection model

`dashboard/lib/course-view.ts` derives current lesson, required progress,
competency evidence, project status, capstone milestones, and history from the
canonical curriculum plus version-1 progress state. Project files never imply
completion.

The optional curriculum `checkpoint` field is presentation metadata for an
interrupted lesson: current, completed, and remaining step labels. It does not
change completion. Each learner's saved lesson state remains local.

Mastery uses evidence states—NOT INTRODUCED, INTRODUCED, GUIDED, PRACTICED,
INDEPENDENT, and MASTERED—rather than an invented percentage. The projection
does not persist a new mastery claim.
