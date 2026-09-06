"""Lesson, assessment, and project metadata for the MarketingOps AI course."""

from __future__ import annotations

from typing import Any


PHASE_OUTCOMES = {
    "Existing foundations and bridge": "independent Python foundations demonstrated with a blank-file campaign rules checker",
    "Python for marketing data": "a Campaign Performance Analyzer with deterministic KPIs and rejected-record evidence",
    "Reliable business logic and data models": "a typed, tested, and observable KPI Engine",
    "APIs and business data integration": "mock-first Analytics, CRM, and Ads connectors",
    "Backend and persistence": "a persistent MarketingOps API with correlated evidence",
    "LLM engineering": "a schema-validated AI Performance Analyst that cannot execute actions",
    "Tools, agents, and orchestration": "a bounded, resumable agent workflow with typed tools",
    "Policy engine and human oversight": "policy-controlled execution with binding human approval",
    "Autonomous MarketingOps capstone": "a measured goal-driven agent inside policy, budget, tool, and time constraints",
}

TRACK_FILES = {
    "Python and domain models": "marketingops/domain.py",
    "Data and interfaces": "marketingops/data.py",
    "Reliable automation": "marketingops/automation.py",
    "Git and quality": "docs/change-log.md",
    "Policy and reliability": "marketingops/policy.py",
    "Integrated project": "marketingops/workflow.py",
    "Rest / review": "notes/retrieval.md",
}

TRACK_LENSES = {
    "Python and domain models": "represent the problem with explicit data, small functions, and testable return values",
    "Data and interfaces": "treat files, APIs, configuration, and model output as untrusted structured input",
    "Reliable automation": "bound time, retries, work, cost, and side effects behind a narrow interface",
    "Git and quality": "separate semantic changes from noise and preserve one focused, reviewable outcome",
    "Policy and reliability": "calculate and authorize deterministically, defaulting closed on missing or invalid state",
    "Integrated project": "integrate only the current vertical slice while preserving earlier contracts",
    "Rest / review": "retrieve and rebuild without notes before adding new material",
}

PRINCIPLES = [
    "Python calculates KPIs and enforces business rules deterministically.",
    "AI output is an untrusted proposal, never direct execution authority.",
    "Policy and any required approval precede deterministic adapter execution.",
    "Normal, boundary, malformed, denied, timeout, and duplicate behavior need evidence.",
]


def assessment_for(lesson: dict[str, Any]) -> list[dict[str, Any]]:
    topic = lesson["topic"]
    return [
        {"prompt": f"Before implementing {topic}, what should be explicit?", "choices": ["The input and output contract", "A production credential", "A large framework", "The final capstone"], "answer": 0, "explanation": "A clear contract establishes the data and trust boundary."},
        {"prompt": "Who should calculate basic KPIs and enforce thresholds?", "choices": ["The LLM", "Deterministic Python", "Retrieved web text", "The shell"], "answer": 1, "explanation": "Deterministic code owns arithmetic and enforceable rules."},
        {"prompt": "Which result best demonstrates proficiency?", "choices": ["Recognizing terms", "Copying code", "Independent implementation plus failure tests", "Finishing quickly"], "answer": 2, "explanation": "Retrieval, implementation, and evidence show transferable skill."},
        {"prompt": "What may execute an external marketing action?", "choices": ["Raw model output", "A deterministic adapter after policy and approval", "A research result", "A prompt"], "answer": 1, "explanation": "Validated policy and approval control narrow deterministic adapters."},
        {"prompt": f"How should {topic} enter the product?", "choices": ["As an isolated rewrite", "As an untested experiment", "As a tested increment preserving interfaces", "As undocumented output"], "answer": 2, "explanation": "Cumulative projects remain reliable when each increment extends stable tested interfaces."},
    ]


def guided_steps_for(lesson: dict[str, Any], filename: str) -> list[dict[str, str]]:
    topic = lesson["topic"]
    return [
        {"title": "Predict", "explanation": "Reason before running.", "task": f"Describe the input, transformation, and output for {topic}.", "hint": "Trace one value.", "check": "The prediction is observable."},
        {"title": "Build one piece", "explanation": "Attach syntax to one purpose.", "task": "Write the smallest relevant fragment yourself.", "hint": "Avoid future features.", "check": "It demonstrates one idea."},
        {"title": "Explain", "explanation": "Reading supports writing.", "task": "Explain each name, operator, branch, and return value.", "hint": "Use because and therefore.", "check": "No unexplained syntax remains."},
        {"title": "Cross the boundary", "explanation": "Inputs are not automatically trustworthy.", "task": "Replace the literal with a local fixture or argument and validate it.", "hint": "Include a malformed or boundary value.", "check": "Invalid data has an explicit result."},
        {"title": "Break and debug", "explanation": "Failure is part of the contract.", "task": "Introduce one mistake, predict it, observe it, and make the smallest repair.", "hint": "Read the first relevant error line.", "check": "Record symptom, cause, fix, and prevention."},
        {"title": "Rebuild", "explanation": "Retrieval proves ownership.", "task": f"Rebuild the core behavior in {filename} without copying.", "hint": "Restate the contract first.", "check": "Normal and failure cases pass."},
        {"title": "Connect", "explanation": "Every lesson unlocks one product capability.", "task": "Explain what this unlocks in MarketingOps AI and which component owns it.", "hint": "Name the producer and consumer.", "check": "The explanation includes trust and side-effect boundaries."},
    ]


def lesson_content(lesson: dict[str, Any]) -> dict[str, Any]:
    topic, track, week = lesson["topic"], lesson["track"], lesson["week"]
    outcome = PHASE_OUTCOMES[lesson["phase"]]
    filename = TRACK_FILES[track]
    lens = TRACK_LENSES[track]
    concepts = [
        {"title": f"What {topic} means", "body": f"Treat {topic} as a concrete transformation or decision with named inputs, observable outputs, and explicit failure behavior. The learning goal is independent implementation rather than recognition.", "callout": f"Working lens: {lens}."},
        {"title": "Input and output contract", "body": "Write down types, required fields, valid boundaries, rejected states, and who consumes the result before choosing implementation details.", "details": ["Name every input.", "Name every output.", "State malformed behavior.", "State the trust boundary."]},
        {"title": "Deterministic core", "body": "Keep arithmetic, normalization, schema checks, policy, budgets, and approval decisions in ordinary Python that produces repeatable results.", "details": PRINCIPLES},
        {"title": "Small worked example", "body": "Trace a small local value before generalizing it. Predict first, run second, and explain any difference.", "code": "record = {'spend': 20.0, 'conversions': 4}\ncpa = record['spend'] / record['conversions']\nprint({'cpa': cpa})"},
        {"title": "Failure behavior", "body": "Zero denominators, malformed records, missing configuration, timeouts, denied policy, expired approval, and duplicate retries are expected states at different stages.", "details": ["Return or raise a precise failure.", "Do not continue after an unsafe prerequisite fails.", "Preserve evidence without secrets."]},
        {"title": "Testing", "body": "Start with a normal case, then add the nearest boundaries and at least one malformed or denied case. A passing happy path alone is insufficient evidence."},
        {"title": "AI boundary", "body": "If a model participates, its structured output is still untrusted. Parse and validate it; do not let it calculate authoritative KPIs or invoke an adapter directly."},
        {"title": "Git evidence", "body": "Inspect semantic changes separately from line endings, generated artifacts, local databases, secrets, and accidental edits before staging."},
        {"title": "Mastery standard", "body": f"Mastery means explaining, implementing from a blank file, testing failures, and integrating {topic} without breaking earlier behavior.", "callout": f"This week advances toward {outcome}."},
    ]
    for concept in concepts:
        concept["sources"] = lesson.get("reading", [])
    lab = {"title": f"Deliberate practice: {topic}", "brief": lesson["practice"], "steps": ["State the contract and trust boundary.", "Predict a small example.", "Write the student implementation.", "Run normal, boundary, and failure cases.", "Explain what this unlocks in MarketingOps AI."], "success": f"You can independently explain, implement, test, and debug {topic}."}
    project = {"name": "MarketingOps AI", "milestone": f"Week {week}, increment {lesson['weekday']}", "file": filename, "overview": f"Add only the current {topic} capability to the cumulative MarketingOps product.", "why": f"This increment contributes to {outcome} while preserving earlier contracts.", "user_story": f"As a marketing operator, I need {topic} to produce a reliable, reviewable result.", "brief": f"Implement the smallest tested {topic} increment; do not build later milestones.", "architecture": [f"Expose the capability through {filename}.", "Validate inputs at the trust boundary.", "Keep deterministic rules independently testable.", "Return structured evidence and useful failures.", "Keep model proposals separate from action authority."], "build_steps": ["Review the previous increment.", "Write acceptance tests.", "Let the student implement the smallest change.", "Run normal, boundary, failure, and regression tests.", "Review the Git diff for semantic changes and noise."], "acceptance": ["The capability has an explicit entry point.", "Normal and failure cases are recorded.", "Earlier behavior still passes.", "Output contains no unnecessary secrets.", "No future milestone is implemented."], "final_outcome": outcome, "starter_code": "# Student exercise: begin from requirements.\n# Do not paste a reference solution here.\n", "authorization": "Use local fixtures and mock connectors; policy and approval must precede any later controlled external action."}
    return {"assessment": assessment_for(lesson), "concepts": concepts, "lab": lab, "project": project, "guided_steps": guided_steps_for(lesson, filename), "source_basis": {"label": "Official documentation and course architecture", "sources": lesson.get("reading", [])}}


def grade_assessment(lesson: dict[str, Any], answers: list[int]) -> dict[str, Any]:
    questions = assessment_for(lesson)
    feedback = [{"correct": index < len(answers) and answers[index] == question["answer"], "answer": question["answer"], "explanation": question["explanation"]} for index, question in enumerate(questions)]
    correct = sum(item["correct"] for item in feedback)
    percent = round(correct / len(questions) * 100)
    level = "proficient" if percent >= 80 else "developing" if percent >= 60 else "foundation"
    return {"score": correct, "total": len(questions), "percent": percent, "level": level, "feedback": feedback, "recommendation": "Proceed to the student exercise." if percent >= 80 else "Review the highlighted explanations, then reason through the missed items again."}
