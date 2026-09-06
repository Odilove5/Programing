#!/usr/bin/env python3
"""Validate the public, student-facing course export."""

from pathlib import Path

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
            assert f"Lesson {week.name[5:]}.{index:02d}" in text
            assert "## Objective" in text and "## Student exercise" in text
            assert "## Acceptance criteria" in text and "## Reference workflow" in text
    print("course export valid: 36 weeks, 216 required days, 36 optional days, 252 total")


if __name__ == "__main__":
    main()
