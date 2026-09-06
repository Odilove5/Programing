"""Acceptance checks for this lesson. They intentionally fail until exercise.py is written."""

from exercise import *


def test_acceptance():
    assert check_campaigns([], 100, 10) == {"violations": [], "rejected": []}; assert check_campaigns([], 100, 10)["rejected"] == []
