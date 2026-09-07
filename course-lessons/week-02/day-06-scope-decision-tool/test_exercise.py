"""Acceptance checks for this lesson. They intentionally fail until exercise.py is written."""

from exercise import *


def test_acceptance():
    assert validate_target(" Demo ", {"demo"})["accepted"] is True
    assert validate_target(" ", {"demo"})["accepted"] is False
    assert validate_target("not-allowed", {"demo"})["reason"] == "out of scope"
