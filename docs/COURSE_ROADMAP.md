# Python + AI Software Engineering: MarketingOps AI Roadmap

This is a project-driven course whose capstone is an Autonomous AI Marketing
Operations Agent. The course retains 36 calendar weeks so existing lesson IDs
and progress remain valid. Each week has six required lessons and one optional
retrieval/recovery day. An integrated build every sixth lesson unlocks a visible
capability; blank-file checks periodically verify independent recall.

## Phase 0 — Existing foundations and bridge (Weeks 1–3)

Weeks 1 and 2 remain completed historical foundations. Week 3 Day 1 remains in
progress and must finish its existing `range()` and `while` loop sequence. Days
2–5 bridge existing Python, testing, shell, and Git skills into campaign data.
Day 6 is a blank-file mastery checkpoint: analyze campaign records and identify
CPA or spend violations using only requirements and tests.

Unlock: independently transform and validate a small collection of campaign
records without starter code.

## Phase 1 — Python for marketing data (Weeks 4–7)

Reinforce nested collections, comprehensions, functions, modules, exceptions,
CSV, JSON, `pathlib`, typing basics, and reusable transformations. Marketing
records include impressions, clicks, spend, leads, conversions, revenue, CTR,
CPC, CPA, and ROAS. Zero denominators and malformed records are explicit cases.

Milestone 1: **Campaign Performance Analyzer** reads CSV/JSON, calculates KPIs,
preserves rejected-record evidence, and produces a human-readable summary.

## Phase 2 — Reliable business logic and data models (Weeks 8–11)

Teach dataclasses, enums, type hints, normalization, pure functions, separation
of concerns, configuration, logging, pytest, fixtures, parametrization, and
negative/boundary testing. Domain models grow incrementally: `Campaign`,
`MetricSnapshot`, `Lead`, `BusinessGoal`, `Recommendation`, `Evidence`, and
`ActionRequest`.

Milestone 2: **Reliable KPI Engine** performs all arithmetic and rule evaluation
deterministically; an LLM is never used for arithmetic or authorization.

## Phase 3 — APIs and business data integration (Weeks 12–15)

Teach HTTP, REST, JSON APIs, headers, authentication concepts, pagination,
timeouts, bounded retries and backoff, rate limits, schema validation, mocking,
dependency injection, environment variables, and secrets handling. Begin with
mock `AnalyticsClient`, `CRMClient`, and `AdsClient` implementations.

Milestone 3: **Marketing Data API Connector** retrieves mock metrics and
normalizes them into canonical domain models with evidence and failure records.

## Phase 4 — Backend and persistence (Weeks 16–19)

Teach appropriate OOP, service/repository boundaries, FastAPI,
request/response schemas, SQLite and SQL, persistence, CRUD, migration concepts,
structured logging, correlation IDs, error boundaries, and background-job
concepts.

Milestone 4: **MarketingOps Backend** exposes goals, campaigns, metrics,
recommendations, approvals, actions, and evidence through a persistent API.

## Phase 5 — LLM engineering (Weeks 20–23)

Introduce model APIs only after deterministic processing is established. Teach
prompt and context construction, instruction roles, structured output, schema
validation, hallucination boundaries, untrusted context and prompt injection,
evaluation fixtures, token/cost awareness, retries, and model failure handling.

Milestone 5: **AI Performance Analyst** receives verified KPIs, a business goal,
and evidence IDs and returns a validated recommendation. It cannot execute.

## Phase 6 — Tools, agents, and orchestration (Weeks 24–27)

Teach typed tool contracts, allowlisted registries, planner/executor separation,
state machines, task decomposition, persistent and short-lived state, bounded
loops, idempotency, retries, failure recovery, concurrency, async work, and
agent evaluation. Add Strategist, Research, Content, and Performance Analyst
roles only when their distinct contracts justify them.

Milestone 6: **Agent Workflow** completes a bounded multi-step campaign
optimization plan using explicit schemas and deterministic tools.

## Phase 7 — Policy engine and human oversight (Weeks 28–31)

Teach policy as code, action classification, budget and threshold rules,
approval workflows, audit logs, dry-run, fail-closed execution, idempotency,
rollback/compensation concepts, scheduling, and monitoring. Progress through
autonomy levels 0–4 only when tests and policy evidence justify the increase.

Milestone 7: **Policy-Controlled Execution** allows safe reads and draft
generation, requires approval for higher-risk publication or budget changes,
and denies actions exceeding policy.

## Phase 8 — Autonomous MarketingOps capstone (Weeks 32–36)

Integrate—not rewrite—the Goal Manager, Planner, Data Integration Layer,
Metrics Engine, Research and Content agents, Performance Analyst, Policy Engine,
Approval Service, Execution Adapters, Evidence Store, Scheduler/Orchestrator,
and Observability Layer. Test failure recovery, delayed measurement, policy
denial, approval expiry, idempotency, cost limits, and release quality.

Milestone 8: **Autonomous MarketingOps Capstone** repeatedly measures progress
toward a bounded business goal while remaining inside policy, budget, tool, and
time constraints.

## Retrieval and Git practice

Every phase contains blank-file retrieval checks. The student receives a
contract and tests but no starter implementation. Git exercises explicitly
separate semantic edits from CRLF/LF noise, generated files, `.DS_Store`, and
accidental text before a focused commit is created.

