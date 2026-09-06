"""Acceptance checks for this lesson. They intentionally fail until exercise.py is written."""

from exercise import *


def test_acceptance():
    assert review_note()["concept"] == "input validation"; assert isinstance(review_note(), dict)
