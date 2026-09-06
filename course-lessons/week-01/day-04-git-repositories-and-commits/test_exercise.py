"""Acceptance checks for this lesson. They intentionally fail until exercise.py is written."""

from pathlib import Path
from exercise import *


def test_acceptance():
    assert "focused lesson change" in Path("CHANGELOG.md").read_text(encoding="utf-8"); assert "git diff" in Path("CHANGELOG.md").read_text(encoding="utf-8") if Path("CHANGELOG.md").exists() else True
