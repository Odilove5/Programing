"""Acceptance checks for this lesson. They intentionally fail until exercise.py is written."""

from exercise import *


def test_acceptance():
    test_loop_boundaries(); assert loop_values(1) == [1]; assert loop_values(0) == []
