#!/usr/bin/env python3
"""Export the canonical 36-week catalog as GitHub-friendly lesson folders.

This is a presentation/export layer only. It does not edit workspace exercises,
the dashboard curriculum, or progress records. Re-running it is deterministic.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from course_catalog import PATHS, unit_for_day


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "course-lessons"


def slug(value: str) -> str:
    value = value.lower().replace("&", "and")
    value = re.sub(r"[^a-z0-9]+", "-", value).strip("-")
    return value[:72]


def phase_for_week(week: int) -> str:
    return next(name for name, _level, start, end in PATHS if start <= week <= end)


def week_module(week: int) -> dict[str, object]:
    first = unit_for_day(week, 1)
    return first


def content_status(week: int) -> str:
    if week <= 2:
        return "Validated"
    if week == 3:
        return "Authored (partial)"
    return "Draft"


def lesson_directory(week: int, day: int, unit: dict[str, str]) -> Path:
    return OUTPUT / f"week-{week:02d}" / f"day-{day:02d}-{slug(unit['topic'])}"


def write_week_overview(week: int) -> None:
    module = week_module(week)
    daily = [unit_for_day(week, day) for day in range(1, 8)]
    lines = [
        f"# Week {week:02d} — {module['title']}",
        "",
        f"**Theme:** {phase_for_week(week)}  ",
        f"**Track:** {module['track']}  ",
        f"**Content readiness:** {content_status(week)}",
        "",
        "## What you will learn",
        "",
        f"{module['description']}",
        "",
        "By the end of this week, you should be able to:",
        "",
    ]
    lines.extend(f"- {objective}" for objective in module["objectives"])
    lines.extend([
        "",
        "## Prerequisites",
        "",
        *[f"- {item}" for item in module["prerequisites"]],
        "",
        "## Daily sequence",
        "",
    ])
    for day, unit in enumerate(daily, 1):
        optional = " — **Optional review/recovery**" if day == 7 else " — **Required**"
        directory = lesson_directory(week, day, unit).name
        lines.append(f"{day}. [Day {day:02d} — {unit['topic']}]({directory}/instructions.md){optional}")
    lines.extend([
        "",
        "## Weekly project or milestone",
        "",
        f"**{module['capabilities'][-1]}** — complete the Day 06 applied project and retain the tests and evidence requested by its instructions.",
        "",
        "## Skills practiced",
        "",
        *[f"- {capability}" for capability in module["capabilities"]],
        "",
        "## Definition of completion",
        "",
        "Days 01–06 are complete when the student can explain the concept, implement it without copying, test normal/boundary/failure behavior, and connect the capability to MarketingOps AI. Day 07 is optional retrieval practice and is not included in the required lesson total.",
        "",
        f"[← Full curriculum](../README.md) · [Week {week:02d} folder](.)",
        "",
    ])
    (OUTPUT / f"week-{week:02d}" / "README.md").write_text("\n".join(lines), encoding="utf-8")


def write_curriculum_index() -> None:
    rows = []
    for week in range(1, 37):
        module = week_module(week)
        daily = [unit_for_day(week, day) for day in range(1, 8)]
        topics = "; ".join(unit["topic"] for unit in daily[:6])
        rows.append(
            f"| {week} | [{module['title']}](week-{week:02d}/README.md) | {topics} | {module['capabilities'][-1]} | {content_status(week)} |"
        )
    content = "# Course lessons — daily curriculum\n\n"
    content += "A reusable, 36-week Python + AI Software Engineering course. Days 01–06 are required; Day 07 is optional retrieval/recovery. The dashboard is optional—this index and the linked lesson files are sufficient to follow the course.\n\n"
    content += "## Lesson totals\n\n- **216 required lessons** (36 weeks × 6 days)\n- **36 optional review days**\n- **252 total daily entries**\n\n"
    content += "## Weekly curriculum\n\n| Week | Weekly theme | Daily topics (Days 01–06) | Project or milestone | Content status |\n|---:|---|---|---|---|\n"
    content += "\n".join(rows)
    content += "\n\n## Lesson workflow\n\nOpen a week README, choose the next day, read `instructions.md`, complete `exercise.py`, run its tests, and compare with the separate `solution.py` reference pattern only after attempting the work.\n"
    (OUTPUT / "README.md").write_text(content, encoding="utf-8")


def instructions(week: int, day: int, unit: dict[str, str]) -> str:
    status = "required" if day <= 6 else "optional retrieval / recovery"
    return f"""# Lesson {week:02d}.{day:02d}: {unit['topic']}

**Phase:** {phase_for_week(week)}  
**Module:** {unit['title']}  
**Track:** {unit['track']}  
**Format:** {unit['kind']}  
**Status:** {status}

## Objective

{unit['description']}

By the end of this lesson, you should be able to explain the concept,
implement a small deterministic example, test a normal and boundary case, and
describe how the capability supports the Autonomous MarketingOps AI without
giving an AI model unrestricted authority.

## Read first

1. Predict the inputs, outputs, state changes, and likely failure cases before
   running code.
2. Read the relevant official documentation linked from the dashboard lesson.
3. Work from a local fixture or fictional data. Do not add credentials or
   real customer data.

## Worked example

The dashboard provides a small, inspectable example for this lesson. Re-type
the important idea in your own words before opening the reference file.

## Student exercise

Open `exercise.py` and implement the requirements in your own words. Keep the
implementation small and observable. Your work should demonstrate these
capabilities:

- {unit['capabilities'][0]}
- {unit['capabilities'][1]}
- {unit['capabilities'][2]}
- {unit['capabilities'][3]}
- {unit['capabilities'][4]}

Run the exercise with:

```bash
python exercise.py
```

Add or run tests for a normal case, a boundary case, and one malformed,
denied, or failed case. Do not treat a passing happy-path example as proof of
correctness.

## Acceptance criteria

- The result is deterministic and has a clear input/output boundary.
- Invalid or out-of-scope input fails safely and explains what happened.
- The implementation does not bypass validation, policy, approval, or evidence
  boundaries introduced later in the course.
- You can explain the key decision without copying the reference file.

## Optional hints

- Start with the smallest input that can prove the rule.
- Name the state that changes and the condition that must eventually stop.
- Keep calculation and policy decisions in Python, not in prose or a model.

## What this unlocks in MarketingOps AI

This lesson is one bounded capability in the cumulative MarketingOps system.
The next layers can compose it only when its inputs, outputs, errors, and
evidence are explicit and testable.

## Reference workflow

Attempt the exercise first. Then compare your design with `solution.py`, run
the example again, and record one difference you would keep or change.
"""


def exercise(week: int, day: int, unit: dict[str, str]) -> str:
    return f'''"""Student exercise for Lesson {week:02d}.{day:02d}: {unit["topic"]}.

This file is intentionally incomplete. Write the implementation yourself.
"""

# Requirements:
# 1. Implement: {unit["capabilities"][0]}.
# 2. Demonstrate: {unit["capabilities"][1]} and {unit["capabilities"][2]}.
# 3. Handle this failure boundary explicitly: {unit["capabilities"][3]}.
# 4. Produce the lesson deliverable: {unit["capabilities"][4]}.
# 5. Add a normal, boundary, and malformed/denied test case.

# Your implementation goes here.
'''


def solution(week: int, day: int, unit: dict[str, str]) -> str:
    return f'''"""Reference pattern for Lesson {week:02d}.{day:02d}: {unit["topic"]}.

This is deliberately a small reference model, not a replacement for the
student exercise or a future capstone implementation. Compare the boundaries,
naming, and failure handling after attempting exercise.py.
"""

REFERENCE = {{
    "lesson": "{week:02d}.{day:02d}",
    "topic": {unit["topic"]!r},
    "input_contract": "explicit local fixture or fictional record",
    "success_contract": "deterministic structured result",
    "failure_contract": "specific, safe, inspectable failure",
    "capstone_capability": {unit["capabilities"][4]!r},
}}


if __name__ == "__main__":
    for key, value in REFERENCE.items():
        print(f"{{key}}: {{value}}")
'''


def main() -> None:
    OUTPUT.mkdir(exist_ok=True)
    (OUTPUT / "README.md").write_text(
        """# Course lessons

One folder per canonical `week-NN-day-NN` lesson. Each lesson keeps the same
three-file workflow as the reference course:

- `instructions.md` — objective, exercise contract, acceptance criteria
- `exercise.py` — intentionally incomplete student file
- `solution.py` — separate reference pattern to inspect after attempting

These files are a presentation/export mirror. The dashboard curriculum and
canonical progress records remain the source of truth.
""",
        encoding="utf-8",
    )
    for week in range(1, 37):
        for day in range(1, 8):
            unit = unit_for_day(week, day)
            directory = lesson_directory(week, day, unit)
            directory.mkdir(parents=True, exist_ok=True)
            (directory / "instructions.md").write_text(instructions(week, day, unit), encoding="utf-8")
            (directory / "exercise.py").write_text(exercise(week, day, unit), encoding="utf-8")
            (directory / "solution.py").write_text(solution(week, day, unit), encoding="utf-8")
        write_week_overview(week)
    write_curriculum_index()
    print(f"Exported 252 lessons to {OUTPUT}")


if __name__ == "__main__":
    main()
