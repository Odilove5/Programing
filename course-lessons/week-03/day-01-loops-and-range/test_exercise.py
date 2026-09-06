"""Acceptance checks for this lesson. They intentionally fail until exercise.py is written."""

from exercise import *


def test_acceptance():
    assert bounded_attempts(3) == [1, 2, 3]; assert safe_countdown(0) == []; assert bounded_attempts(0) == []; assert safe_countdown(1) == [1]
