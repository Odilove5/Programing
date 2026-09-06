"""Acceptance checks for this lesson. They intentionally fail until exercise.py is written."""

from exercise import *


def test_acceptance():
    assert retry_states(3) == [1, 2, 3]; assert drain_queue([]) == []; assert retry_states(0) == []; assert drain_queue(["a", "b"]) == ["a", "b"]
