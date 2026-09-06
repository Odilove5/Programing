# Python + AI MarketingOps Course — Implementation Progress

Last updated: 2026-08-07

## MarketingOps AI curriculum migration — 2026-09-04

- Preserved all Week 1 and Week 2 completion evidence and the in-progress Week
  3 Day 1 checkpoint.
- Retained the 36-week/252-day identity scheme so dashboard progress, notes,
  confidence, and study sessions continue to reference the same lesson IDs.
- Replaced the future security-assessment path with nine phases: Phase 0 bridge
  plus Python marketing data, reliable models, API integration, backend and
  persistence, LLM engineering, agent orchestration, policy and oversight, and
  the Autonomous MarketingOps capstone.
- Added an explicit Week 3 Day 1 resume lesson for bounded `range()` practice,
  `while` state and termination, loop selection, and boundary tests.
- Added a blank-file campaign-rules mastery checkpoint before the migrated
  curriculum begins.
- Documented architecture, trust boundaries, autonomy levels, milestone
  mapping, coaching constraints, and old-to-new curriculum treatment.
- Did not delete or cosmetically rewrite completed student exercise projects.

## Example-first interactive coding sequence — 2026-08-07

- Reordered every lesson to begin with a realistic example connected to its learning objective and authorized project context.
- Added an automatic line-by-line walkthrough explaining imports, assignments, conditions, functions, returns, errors, output, and shell formatting.
- Moved the learner exercise to the final build stage and added an editable in-browser code workbench.
- Added local Python, Bash, and PowerShell execution with argument-list process launching, captured output, a 50,000-character input limit, a five-second timeout, and a course-workspace working directory.
- Added three progressively revealed hints, reset behavior, live output, exit codes, interpreter errors, and an explicit local-code safety warning.
- Extended browser coverage to type and run Python code and verify the example → explanation → exercise ordering.

## Practice-first lesson sequence — 2026-08-07

- Reordered every lesson into three visible stages: `Try before reading`, `Understand`, and `Build`.
- Lessons now open with a 10–15 minute no-notes diagnostic exercise that records the learner's current mental model and errors.
- Explanations, objectives, vocabulary, official reading, and guided demonstrations follow the initial attempt.
- Each lesson ends its instructional sequence with a small authorized project containing an overview, safety boundary, steps, expected outcome, deliverable criteria, and cleanup.
- Knowledge checks, troubleshooting, defensive relevance, notes, confidence, and completion evidence remain after the project.
- Added browser assertions that enforce the practice → explanation → project order.

## Pluralsight-style Python foundations redesign — 2026-08-07

- Reviewed the public table of contents and learning outcomes for Pluralsight's Python 3 Fundamentals course, last updated November 16, 2023.
- Rebuilt weeks 1–8 around its public progression: data types and I/O; conditionals and imports; lists and loops; dictionaries, JSON, pip, virtual environments, and APIs; functions; classes and objects; inheritance/composition; exceptions and files.
- Retained the platform's original content and official Python documentation as the technical authority; no proprietary video or transcript content was copied.
- Applied an explain, demonstrate, practise, check, and portfolio-build rhythm to the existing lesson experience.
- Reframed every demonstration around safe local security automation and cumulative tool engineering.

## Official-source content pass — 2026-08-07

- Reviewed current official Python, GNU Bash, Microsoft PowerShell, Pro Git, GitHub Docs, OWASP WSTG/Cheat Sheets, PortSwigger Academy, and MDN HTTP materials.
- Replaced broad homepage citations with more than 40 lesson-specific official pages covering the exact APIs, language constructs, workflows, and testing methods taught.
- Made official documentation the primary source basis for lesson explanations; local PDFs remain supplemental only for sequencing and safe topic selection.
- Added automated enforcement that every required lesson has approved-domain resources and that the course uses a broad set of specific source URLs.

## Substantive lesson-content pass — 2026-08-07

- Replaced generic concept prose with 36 distinct technical briefings covering Python foundations through local AI security-agent release engineering.
- Added seven track-specific instructional methods for Python, Bash/PowerShell, automation, Git/GitHub, security methodology, integrated projects, and retrieval practice.
- Every calendar record now receives a unique combination of technical instruction and track practice; required lessons retain worked code, exercises, labs, deliverables, checks, troubleshooting, and defensive context.
- Added an automated uniqueness and minimum-depth test for all 252 lesson records.

## Curriculum source adaptation — 2026-08-07

- Reviewed all three pages of the local 100 Days of Python syllabus and mapped its relevant beginner, intermediate, API, database, analysis, and portfolio topics into the Python track.
- Reviewed the chapter map and selected safe portions of the local security-Python book: Python foundations, bounded service inventory, forensic metadata, SQLite artifact analysis, passive packet analysis, web parsing, and APIs.
- Added explicit source-basis metadata to every lesson and unsafe-legacy exclusion metadata to Python, automation, and integrated-lab lessons.
- Reframed weeks 33–36 around provider-neutral AI security tools: typed tool schemas, allowlisted registries, plan/act/observe separation, bounded asynchronous execution, deterministic evaluation, audit logs, packaging, and release.
- Excluded brute force, botnets, malware, persistence, evasion, credential theft, phishing, exploit writing, and uncontrolled scanning.
- Tests: `npm.cmd run typecheck` passed; `npm.cmd test` passed with 12 tests after adaptation.

## Milestone 1 — Discovery and architecture

Status: Complete

### Completed work

- Inspected the existing dependency-free Python study coach, curriculum, tests, README, learner workspace, and web starter.
- Confirmed the Python CLI already generates a 36-week/252-day schedule and stores local progress in `.study-progress.json`.
- Confirmed the web surface is an existing Next-compatible App Router project using TypeScript, Tailwind CSS, Vinext, Drizzle, and a local Cloudflare D1 (SQLite) runtime.
- Confirmed no repository-level `AGENTS.md` instructions are present.
- Chose to preserve the Python CLI and its curriculum rather than replace or discard it.

### Architecture decision

The production web application lives in `dashboard/`. It retains the existing Vinext App Router and Cloudflare-compatible build because the repository already contains that working structure and lockfile. The requested Prisma layer is replaced by Drizzle ORM over D1-compatible SQLite: the starter already includes Drizzle and its local runtime persists SQLite data across restarts, while Prisma's native engine is not compatible with the Cloudflare Worker output required by this project. Zod validates curriculum and import/export payloads. This is the smallest coherent deviation from the requested default stack.

The original `curriculum.json` remains supported by `study_coach.py`. The web platform uses a richer, versioned curriculum schema and includes a deterministic migration/generation utility that maps the original phase and weekly rotation into 252 validated daily records. Progress export/import uses a separate versioned schema so curriculum upgrades do not silently overwrite student work.

The application is single-user and local-first. Authentication is intentionally not required. Durable student records use SQLite; browser storage is limited to non-authoritative display preferences.

### Changed files

- `docs/IMPLEMENTATION_PROGRESS.md`

### Tests run

- None yet; discovery only.

### Remaining work

- Define curriculum and database schemas.
- Build the application routes and student workflows.
- Generate and validate all curriculum records.
- Add automated and browser tests.
- Complete release documentation and clean-install verification.

### Decisions and assumptions

- Existing untracked files are treated as user work and preserved.
- The existing Python dashboard remains available during migration; the new application does not delete it.
- Security labs remain limited to local VMs, deliberately vulnerable applications, PortSwigger Academy, and explicitly authorized targets.

## Milestone 2 — Application foundation

Status: Complete

### Completed work

- Replaced the starter preview with the branded App Router application shell, responsive navigation, dark neutral design system, focus states, reduced-motion handling, loading/error states, and first-launch onboarding.
- Added Zod curriculum and progress schemas, SQLite persistence, typed Drizzle table definitions, and versioned import/export.
- Preserved the CLI and documented the web curriculum migration path.

### Tests run

- `npm.cmd run typecheck` — passed.
- `npm.cmd run lint` — passed.
- `npm.cmd run build` — passed.

## Milestone 3 — Student workflow

Status: Complete

### Completed work

- Implemented dashboard, curriculum search/filtering, lesson viewer, weekly overview, progress analytics, notes, bookmarks, review queue, settings, reset confirmation, and import/export.
- Implemented lesson completion checklists, quiz scores, confidence, notes, study sessions, date-based current lesson, unlocking, previous/next navigation, and project milestones.

## Milestone 4 — Complete curriculum

Status: Complete

### Completed work

- Generated and schema-validated 252 records across all 36 weeks: 216 required lessons and 36 review/rest records.
- Added distinct weekly topics, substantive concept sections, official resources, examples, exercises, authorized labs, deliverables, checks, troubleshooting, defensive connections, and cumulative project increments.
- Included all 12 requested portfolio projects and every-fourth-week portfolio checkpoints.

### Tests run

- `npm.cmd test` — 10 tests passed.

## Milestone 5 — Quality and accessibility

Status: Complete

### Completed work

- Added responsive mobile/tablet/desktop layouts, semantic landmarks, labels, skip navigation, keyboard focus, status contrast, and reduced-motion support.
- Added Vitest curriculum/progress coverage and Playwright critical-journey coverage.

### Tests run

- `npm.cmd run test:browser` — 2 browser workflows passed on Chromium.
- `python -m unittest -v` — 10 compatibility tests passed.

## Milestone 6 — Release readiness

Status: Complete

### Completed work

- Completed README, Windows/Linux setup, architecture, curriculum authoring, data/import-export, testing, security/threat-model, contribution, and troubleshooting documentation.
- Verified the production build and local production server through Playwright.

### Known limitations

- Single-user local mode has no authentication or multi-device synchronization.
- SQLite data is not encrypted at rest.
- The curriculum is generated from reviewed topic data rather than stored as 252 separate MDX files.
- Network link checking is optional; automated offline tests validate URL syntax and approved source structure.
