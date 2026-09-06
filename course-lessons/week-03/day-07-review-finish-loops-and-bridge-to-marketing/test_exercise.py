"""Acceptance checks for this lesson. They intentionally fail until exercise.py is written."""

from exercise import *


def test_acceptance():
    assert retrieval_report()["loops_rebuilt"] == [1, 2, 3]
