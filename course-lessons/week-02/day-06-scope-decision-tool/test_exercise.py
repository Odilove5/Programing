"""Acceptance checks for this lesson. They intentionally fail until exercise.py is written."""

from exercise import *


def test_acceptance():
    assert validate_target(" Demo ", {"demo"})["accepted"]; assert validate_target(" ", {"demo"})["valid"] is False
