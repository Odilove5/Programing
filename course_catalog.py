"""Project-driven Python and AI curriculum catalog for MarketingOps AI."""

PATHS = [
    ("Existing Foundations / Bridge", "Beginner", 1, 3),
    ("Python for Marketing Data", "Beginner", 4, 7),
    ("Reliable Business Logic & Data Models", "Beginner to intermediate", 8, 11),
    ("APIs & Business Data Integration", "Intermediate", 12, 15),
    ("Backend & Persistence", "Intermediate", 16, 19),
    ("LLM Engineering", "Intermediate", 20, 23),
    ("Tools, Agents & Orchestration", "Intermediate to advanced", 24, 27),
    ("Policy Engine & Human Oversight", "Advanced", 28, 31),
    ("Autonomous MarketingOps Capstone", "Advanced", 32, 36),
]

# title, primary track, description, five ordered capabilities
MODULES = [
    ("Think Like a Programmer", "Python", "Preserve the completed foundation in values, types, input, output, errors, and small scripts.", ["values and variables", "strings, integers, and booleans", "input and conversion", "tracebacks and handled errors", "an authorized-target report"]),
    ("Make Decisions with Data", "Python", "Preserve the completed foundation in Boolean logic, conditions, validation, functions, tests, and Git.", ["comparisons and Boolean logic", "conditional branches", "normalization and validation", "functions and basic tests", "a scope decision tool"]),
    ("Finish Loops and Bridge to Marketing", "Python", "Complete the active loop lesson, then prove foundational fluency with campaign records from a blank file.", ["lists, sets, for loops, range, and while", "state changes and termination", "loop boundary tests", "semantic Git diff review", "a blank-file campaign rules checker"]),
    ("Transform Campaign Records", "Python", "Use nested collections and reusable functions to normalize realistic campaign data.", ["nested dictionaries", "list comprehensions", "pure transformations", "malformed record evidence", "a campaign record transformer"]),
    ("Read Marketing Files", "Python", "Read and validate campaign data from local CSV and JSON fixtures.", ["CSV rows and JSON values", "pathlib and encodings", "file exceptions", "input contracts", "a dual-format campaign loader"]),
    ("Calculate Marketing KPIs", "Python", "Calculate CTR, CPC, CPA, and ROAS deterministically with safe zero handling.", ["ratio formulas", "zero denominators", "numeric validation", "human-readable summaries", "a deterministic KPI calculator"]),
    ("Release the Campaign Analyzer", "Integrated project", "Combine file loading, validation, KPI calculation, rejected evidence, and reporting.", ["module boundaries", "typed function signatures", "regression tests", "focused Git packaging", "Campaign Performance Analyzer"]),
    ("Model the Marketing Domain", "Python", "Represent core marketing concepts with typed dataclasses and enums.", ["dataclasses", "enums", "type hints", "model invariants", "Campaign and MetricSnapshot models"]),
    ("Design Pure Business Rules", "Python", "Separate deterministic calculations and decisions from I/O and presentation.", ["pure functions", "separation of concerns", "normalization", "dependency ordering", "goal-progress rules"]),
    ("Configure and Observe the Engine", "Python automation", "Use validated configuration and structured, secret-safe logging.", ["configuration precedence", "environment variables", "log levels and context", "secret redaction", "an observable metrics run"]),
    ("Prove Business Logic", "Testing", "Use pytest fixtures and parametrization to prove boundaries and failures.", ["pytest structure", "fixtures", "parametrization", "negative tests", "Reliable KPI Engine"]),
    ("Understand HTTP and REST", "Python automation", "Model requests, responses, JSON contracts, timeouts, and API errors.", ["HTTP methods and status", "headers and JSON", "timeouts", "error categories", "a mock analytics request"]),
    ("Build Bounded API Clients", "Python automation", "Handle pagination, retries, backoff, rate limits, and idempotent reads.", ["pagination", "bounded retries", "exponential backoff", "rate-limit behavior", "a paginated metrics client"]),
    ("Protect Credentials and Validate Schemas", "Python automation", "Load secrets safely and reject malformed or untrusted API data.", ["authentication concepts", "environment secrets", "schema validation", "untrusted data", "a validated CRM response"]),
    ("Design Mock-First Connectors", "Integrated project", "Define injectable Analytics, CRM, and Ads interfaces with mock implementations.", ["protocols and interfaces", "dependency injection", "mock clients", "contract tests", "Marketing Data API Connector"]),
    ("Design Services and Repositories", "Python", "Apply OOP where state and collaborators justify it, with explicit boundaries.", ["service responsibilities", "repository interfaces", "composition", "error boundaries", "campaign and goal services"]),
    ("Persist Marketing Data", "Python automation", "Use SQLite and parameterized SQL for goals, metrics, actions, and evidence.", ["tables and relationships", "CRUD", "constraints", "transactions", "a SQLite evidence repository"]),
    ("Build a FastAPI Boundary", "Backend", "Expose validated request and response schemas through a local API.", ["FastAPI routes", "request schemas", "response schemas", "HTTP error handling", "MarketingOps API resources"]),
    ("Operate a Persistent Backend", "Integrated project", "Add correlation IDs, structured logs, migrations concepts, and job boundaries.", ["correlation IDs", "structured logs", "migration planning", "background-job concepts", "Persistent MarketingOps Backend"]),
    ("Call a Model Safely", "AI engineering", "Introduce model APIs behind a narrow client after deterministic processing is complete.", ["model client boundaries", "system and user instructions", "timeouts and retries", "cost metadata", "a mock-first model gateway"]),
    ("Construct Grounded Context", "AI engineering", "Build prompts from verified goals, KPIs, and evidence while treating context as untrusted.", ["context selection", "prompt construction", "evidence references", "prompt injection boundaries", "an analyst context builder"]),
    ("Validate Structured AI Output", "AI engineering", "Require schema-conforming recommendations and handle model failure explicitly.", ["structured output", "schema validation", "hallucination boundaries", "fallback behavior", "a validated Recommendation"]),
    ("Evaluate the AI Analyst", "Integrated project", "Measure recommendation quality, grounding, cost, and refusal behavior with fixtures.", ["deterministic eval cases", "grounding checks", "uncertainty", "token and cost budgets", "AI Performance Analyst"]),
    ("Define Typed Tools", "AI engineering", "Create narrow tools with explicit input/output schemas and an allowlisted registry.", ["tool contracts", "typed results", "tool registry", "failure behavior", "read-only marketing tools"]),
    ("Separate Planner and Executor", "AI engineering", "Represent proposed plans without granting execution authority.", ["task decomposition", "plan schemas", "planner boundaries", "executor contracts", "a campaign experiment plan"]),
    ("Orchestrate Bounded State", "Python automation", "Use state machines, bounded loops, retries, idempotency, and recovery.", ["state transitions", "persistent versus transient state", "step limits", "idempotency", "a resumable workflow"]),
    ("Coordinate Specialized Agents", "Integrated project", "Introduce only roles with distinct contracts and evaluate their collaboration.", ["Strategist and Analyst roles", "Research and Content roles", "handoff schemas", "agent evaluation", "Agent Workflow"]),
    ("Classify Actions with Policy", "Python", "Express deterministic allow, deny, and approval-required decisions as policy code.", ["action classes", "policy rules", "fail-closed defaults", "decision evidence", "a policy evaluator"]),
    ("Bind Human Approval", "Backend", "Bind approval to exact parameters, identity, reason, and expiry.", ["approval requests", "parameter hashing", "expiry", "separation of duties", "an approval service"]),
    ("Execute Through Controlled Adapters", "Python automation", "Use dry-run, idempotency, budgets, and compensation-aware adapters.", ["deterministic adapters", "dry-run", "idempotency keys", "rollback concepts", "controlled action execution"]),
    ("Operate Autonomy Levels Safely", "Integrated project", "Test autonomy Levels 0–4 without allowing a configured level to bypass policy.", ["autonomy levels", "budget thresholds", "audit logs", "monitoring", "Policy-Controlled Execution"]),
    ("Integrate Goal, Plan, and Metrics", "Capstone", "Connect measurable goals to collection, KPI analysis, and bounded planning.", ["goal contracts", "baselines and horizons", "progress measurement", "plan revisions", "the capstone control loop foundation"]),
    ("Integrate Recommendations and Research", "Capstone", "Connect grounded agent outputs to evidence without granting action authority.", ["research provenance", "analyst recommendations", "content drafts", "uncertainty", "the capstone reasoning layer"]),
    ("Integrate Policy, Approval, and Execution", "Capstone", "Route every proposed side effect through policy and approval-aware adapters.", ["policy decisions", "approval binding", "adapter receipts", "denial behavior", "the capstone action layer"]),
    ("Measure Outcomes and Replan", "Capstone", "Close the loop with delayed metrics, causal caution, scheduling, and bounded replanning.", ["outcome windows", "before/after evidence", "scheduler state", "iteration budgets", "the measured optimization loop"]),
    ("Harden and Release MarketingOps AI", "Capstone", "Test abuse cases and failures, document trust boundaries, and package a reproducible release.", ["failure recovery", "security and privacy review", "observability", "release engineering", "Autonomous MarketingOps Capstone"]),
]

# Student-facing names for the authored foundation lessons. Stable IDs remain
# week-NN-day-NN; these slugs are presentation paths only.
FOUNDATION_LESSONS = {
    (1, 1): ("Values, Types, Input, and Output", "values-types-input-and-output"),
    (1, 2): ("Paths, Quoting, and Redirection", "paths-quoting-and-redirection"),
    (1, 3): ("Normalization and Validation", "normalization-and-validation"),
    (1, 4): ("Git Repositories and Useful Commits", "git-repositories-and-commits"),
    (1, 5): ("Authorization, Scope, and Evidence", "authorization-scope-and-evidence"),
    (1, 6): ("Authorized Target Report", "authorized-target-report"),
    (1, 7): ("Week 1 Review and Retrieval", "review"),
    (2, 1): ("Conditionals and Decisions", "conditionals-and-decisions"),
    (2, 2): ("Comparisons and Boolean Logic", "comparisons-and-boolean-logic"),
    (2, 3): ("Validation with Conditional Branches", "validation-with-conditional-branches"),
    (2, 4): ("Normalization and Validation Practice", "normalization-and-validation"),
    (2, 5): ("Functions and Basic Tests", "functions-and-basic-tests"),
    (2, 6): ("Scope Decision Tool", "scope-decision-tool"),
    (2, 7): ("Week 2 Review and Retrieval", "review"),
    (3, 1): ("Loops and Bounded range() Practice", "loops-and-range"),
    (3, 2): ("Collections and Loops", "collections-and-loops"),
    (3, 3): ("State Changes and Termination", "state-and-termination"),
    (3, 4): ("Loop Boundary Tests", "loop-boundary-tests"),
    (3, 5): ("Semantic Git Diff Review", "semantic-git-diff-review"),
    (3, 6): ("Campaign Rules Checker", "campaign-rules-checker"),
    (3, 7): ("Week 3 Review and Retrieval", "review"),
}


def lesson_presentation(week: int, day: int) -> dict[str, str]:
    unit = unit_for_day(week, day)
    title, folder_slug = FOUNDATION_LESSONS.get((week, day), (f"Day {day:02d}: {unit['topic']}", None))
    if folder_slug is None:
        import re
        folder_slug = re.sub(r"[^a-z0-9]+", "-", unit["topic"].lower().replace("&", "and")).strip("-")
    return {"title": title, "slug": folder_slug}


def canonical_lessons() -> list[dict[str, object]]:
    records = []
    for week in range(1, 37):
        module = module_for_week(week)
        for day in range(1, 8):
            presentation = lesson_presentation(week, day)
            records.append({
                "id": f"week-{week:02d}-day-{day:02d}", "week": week, "day": day,
                "weekly_theme": module["title"], "title": presentation["title"],
                "folder_slug": presentation["slug"], "required": day <= 6,
                "track": module["track"], "phase": module["path"],
                "prerequisites": module["prerequisites"],
                "objectives": module["objectives"],
                "project": module["capabilities"][-1],
                "content_status": "Authored" if week <= 3 else "Draft",
                "folder": f"course-lessons/week-{week:02d}/day-{day:02d}-{presentation['slug']}",
            })
    return records


def path_for_week(week: int):
    return next(path for path in PATHS if path[2] <= week <= path[3])


def module_for_week(week: int):
    title, track, description, capabilities = MODULES[week - 1]
    path, level, _, _ = path_for_week(week)
    return {"title": title, "track": track, "description": description, "capabilities": capabilities,
            "path": path, "level": level,
            "prerequisites": ["No prior experience required"] if week == 1 else [f"Complete module {week - 1}"],
            "objectives": [f"Explain {capabilities[0]}", f"Implement {capabilities[1]} and {capabilities[2]}",
                           f"Diagnose failures involving {capabilities[3]}", f"Build {capabilities[4]}"]}


def unit_for_day(week: int, weekday: int):
    module = module_for_week(week)
    capabilities = module["capabilities"]
    units = [
        ("Introduction and mental model", module["title"], "Learn"),
        ("Core concept", capabilities[0], "Learn"),
        ("Core concept", capabilities[1], "Learn"),
        ("Code walkthrough", capabilities[2], "Code"),
        ("Testing, policy, and diagnosis", capabilities[3], "Practice"),
        ("Applied module project", capabilities[4], "Project"),
        ("Knowledge check and retrieval", f"Review: {module['title']}", "Review"),
    ]
    label, topic, kind = units[weekday - 1]
    return {**module, "unit_label": label, "topic": topic, "kind": kind}
