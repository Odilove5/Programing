#!/usr/bin/env python3
"""Validate the public, student-facing course export."""

from pathlib import Path
import re
import shutil
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
COURSE = ROOT / "course-lessons"


def main() -> None:
    assert (COURSE / "README.md").is_file(), "missing root curriculum index"
    weeks = sorted(COURSE.glob("week-[0-9][0-9]"))
    assert len(weeks) == 36, f"expected 36 week folders, found {len(weeks)}"
    instructions = sorted(COURSE.glob("week-*/day-*/instructions.md"))
    exercises = sorted(COURSE.glob("week-*/day-*/exercise.py"))
    solutions = sorted(COURSE.glob("week-*/day-*/solution.py"))
    assert len(instructions) == len(exercises) == len(solutions) == 252
    for week in weeks:
        assert (week / "README.md").is_file(), f"missing overview: {week}"
        days = sorted(week.glob("day-*"))
        assert len(days) == 7, f"{week.name} must have seven daily folders"
        for index, day in enumerate(days, 1):
            assert day.name.startswith(f"day-{index:02d}-"), f"bad day order: {day}"
            assert all((day / filename).is_file() for filename in ("instructions.md", "exercise.py", "solution.py"))
            text = (day / "instructions.md").read_text(encoding="utf-8")
            identifier = week.name[5:]
            assert f"Lesson {identifier}.{index:02d}" in text or f"Week {identifier}, Day {index:02d}" in text
            assert "## Objective" in text or "## Why this lesson matters" in text
            assert "## Student exercise" in text or "## Exercise handoff" in text
            assert "## Acceptance criteria" in text or "## Common mistakes and failure cases" in text
            assert "## Reference workflow" in text or "## Navigation" in text
            if week.name in {"week-01", "week-02", "week-03"}:
                required_sections = (
                    "## Why this lesson matters", "## What you will learn", "## Concepts",
                    "## Syntax", "## Worked examples", "## MarketingOps example",
                    "## Common mistakes and failure cases", "## Check your understanding",
                    "## Quiz", "## Exercise handoff", "## Navigation",
                )
                for section in required_sections:
                    assert section in text, f"{day}: missing {section}"
                assert text.count("```python") >= 2, f"{day}: needs multiple runnable examples"
                assert "**Expected output**" in text, f"{day}: missing expected output"
                assert text.count("<details>") >= 2, f"{day}: missing collapsible answer sections"
                assert (day / "test_exercise.py").is_file(), f"{day}: missing acceptance tests"
                solution = (day / "solution.py").read_text(encoding="utf-8")
                assert "REFERENCE =" not in solution, f"{day}: metadata-only solution"
                assert re.search(r"def |Path\(|print\(", solution), f"{day}: solution has no implementation"
                assert "The dashboard provides" not in text, f"{day}: dashboard dependency in instructions"
                with tempfile.TemporaryDirectory() as tmp:
                    target = Path(tmp)
                    shutil.copy(day / "solution.py", target / "exercise.py")
                    shutil.copy(day / "test_exercise.py", target / "test_exercise.py")
                    result = subprocess.run(["python3", "-m", "unittest", "-q"], cwd=target, capture_output=True, text=True)
                    assert result.returncode == 0, f"{day}: reference does not satisfy tests\n{result.stdout}\n{result.stderr}"
    print("course export valid: 36 weeks, 216 required days, 36 optional days, 252 total")


if __name__ == "__main__":
    main()
