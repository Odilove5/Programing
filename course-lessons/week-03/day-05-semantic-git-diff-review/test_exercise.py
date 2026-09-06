"""Acceptance checks for this lesson. They intentionally fail until exercise.py is written."""

from exercise import *


def test_acceptance():
    assert review_paths(["exercise.py", "report.json", ".DS_Store"])["excluded"] == ["report.json", ".DS_Store"]; assert review_paths([]) == {"semantic": [], "excluded": []}
