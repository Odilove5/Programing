"""Acceptance checks for this lesson. They intentionally fail until exercise.py is written."""

from exercise import *


def test_acceptance():
    assert review_spend(50, 100) == "within"; assert review_spend(0, 10)["within_limit"] is True
