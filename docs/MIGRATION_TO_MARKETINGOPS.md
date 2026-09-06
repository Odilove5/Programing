# Curriculum migration: security automation to MarketingOps AI

## Progress portability

The migration keeps the `week-NN-day-NN` identity scheme and version-1 progress
document. Course metadata is public; completion records, notes, sessions,
archives, and checkpoints are local learner state and are not seeded in a
fresh clone.

## Old-to-new mapping

| Old range | New destination | Treatment |
| --- | --- | --- |
| Weeks 1–2 operator foundations | Phase 0 foundations | Preserved as reusable foundation lessons |
| Week 3 Day 1 lists and loops | Phase 0 bridge | Preserved as a lesson; learner state is local |
| Weeks 3–4 remaining foundations | Phase 0 bridge and Phase 1 | Consolidated into independent campaign-record practice and data transformations |
| Weeks 5–8 system scripting | Phases 1–2 | Files, configuration, functions, models, logging, and tests retained; host/security framing replaced |
| Weeks 9–16 network/web automation | Phase 3 | HTTP/API/retry/rate-limit skills retained and redirected to mock analytics, CRM, and ads connectors |
| Weeks 17–24 concurrency and security workflow | Phases 4–6 | Persistence/concurrency/orchestration retained; scanning and pentest methodology removed |
| Weeks 25–32 assessment workflow | Phases 6–8 | State, policies, evidence, authorization, and retesting consolidated into agents, approvals, and outcome measurement |
| Weeks 33–36 security-agent capstone | Phase 8 | Provider-neutral agent engineering retained and redirected to MarketingOps goals and controlled adapters |

## Preserved cross-cutting principles

Input validation, untrusted-data handling, fail-closed defaults, safe dependency
ordering, secrets management, least privilege, authorization, audit logging,
policy enforcement, deterministic execution, and negative testing remain.

## Consolidated or removed themes

Pentesting-specific enumeration, vulnerability methodology, Windows/Linux
misconfiguration auditing, exploit-oriented material, and security findings are
not continued as standalone topics. General HTTP, TLS, identity, input safety,
evidence, rate limiting, and authorization concepts remain where they support
reliable application and AI engineering.

## Existing Git noise documented, not discarded

At migration time, nested repositories contained CRLF/LF-only modifications,
an untracked `.DS_Store`, and an accidental `056` in the Week 3 README. These
pre-existing learner/environment changes are intentionally left untouched for a
future Git-hygiene lesson.
