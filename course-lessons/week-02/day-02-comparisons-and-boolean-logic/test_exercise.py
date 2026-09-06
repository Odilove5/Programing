"""Acceptance checks for this lesson. They intentionally fail until exercise.py is written."""

from exercise import *


def test_acceptance():
    assert above_threshold([{"bytes": 4}, {"bytes": 12}], 5) == [{"bytes": 12}]
