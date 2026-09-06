# Autonomous MarketingOps architecture

## Governing flow

```text
Business goal -> Planner -> Data collection -> Deterministic KPI analysis
-> AI recommendation -> Policy validation -> Human approval when required
-> Deterministic execution -> Evidence capture -> Outcome measurement
-> Next iteration
```

There is no path from model output directly to an external side effect. AI
proposes; deterministic code validates and authorizes; an approved adapter
executes; the system records what happened.

## Components and responsibilities

- **Goal Manager:** stores measurable targets, constraints, baselines, horizon,
  and success/failure criteria.
- **Planner:** decomposes a goal into bounded data, analysis, experiment, and
  measurement steps. Plans are proposals, not permissions.
- **Data Integration Layer:** uses typed Analytics, CRM, and Ads interfaces;
  mock implementations precede live adapters.
- **Metrics Engine:** calculates CTR, CPC, CPA, ROAS, conversion rates, deltas,
  and goal progress with deterministic Python.
- **Research Agent:** retrieves only approved contextual sources and returns
  cited structured observations.
- **Content Agent:** creates draft variants; publication is a separate action.
- **Performance Analyst:** turns verified metrics and evidence references into
  hypotheses and recommendations, never arithmetic or execution decisions.
- **Policy Engine:** classifies action, checks budget/tool/time constraints, and
  returns allow, deny, or require-approval with reasons.
- **Approval Service:** presents the exact proposed action, parameters, expected
  impact, evidence, expiry, and policy reason to a human.
- **Execution Adapters:** deterministic, narrow, typed, idempotent integrations;
  no arbitrary shell or dynamically selected network destination.
- **Evidence Store:** append-oriented records for inputs, plans, metrics, model
  outputs, policy decisions, approvals, execution receipts, and outcomes.
- **Scheduler/Orchestrator:** advances the state machine with step, retry,
  concurrency, budget, and wall-clock bounds.
- **Observability Layer:** correlated logs, metrics, costs, latency, denials,
  failures, and outcome measurements with secret redaction.

## Trust boundaries

Operator input, configuration, API responses, retrieved web content, model
output, and approval callbacks are untrusted until parsed and validated. Secrets
cross only the adapter boundary and are never included in prompts or evidence.
The policy engine is deterministic and cannot be overridden by prompt text.
External actions are allowlisted by adapter and operation.

## Autonomy levels

- **Level 0 — Observe:** calculate and display evidence only.
- **Level 1 — Recommend:** generate a proposal with no executable request.
- **Level 2 — Human approval:** prepare a typed action and wait for approval.
- **Level 3 — Bounded autonomy:** execute explicitly pre-approved low-risk
  actions within narrow limits.
- **Level 4 — Goal-driven autonomy:** plan and execute approved actions inside
  policy, budget, tool, iteration, and time bounds.

Moving upward is configuration controlled, evidence backed, reversible, and
covered by tests. A higher configured level never bypasses a deny rule.

## Policy and approval model

Policy input is a validated `ActionRequest`, current budget state, business
goal, adapter capability, and relevant evidence. Policy output contains a
decision, rule IDs, reasons, evaluated values, and required approval class.
Missing data or conflicting rules fail closed.

Draft generation and metric retrieval may be allowed. Publishing content and
larger budget changes require approval. Projected spend above the daily budget
is denied. Approval binds to a hash of the exact action parameters, has an
expiry, and cannot authorize a later modified request.

## Evidence and audit model

Every iteration receives a correlation ID. Evidence records include source,
collection time, schema version, relevant hashes, goal/plan/action IDs, policy
decision, approval identity and time, adapter receipt, and measured outcome.
Logs redact tokens and sensitive customer data. Idempotency keys prevent a
retry from duplicating publication or budget changes.

## Milestone integration

1. Campaign Analyzer establishes trustworthy input and KPI summaries.
2. KPI Engine establishes typed deterministic domain logic.
3. Data API Connector establishes bounded external data collection.
4. MarketingOps Backend establishes persistence and service boundaries.
5. AI Performance Analyst adds validated recommendations without execution.
6. Agent Workflow adds bounded planning and specialized roles.
7. Policy-Controlled Execution adds approval and deterministic adapters.
8. Capstone closes the measurement and replanning loop.

