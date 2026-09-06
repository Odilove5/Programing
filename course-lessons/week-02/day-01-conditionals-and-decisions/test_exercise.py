"""Acceptance checks for this lesson. They intentionally fail until exercise.py is written."""

from exercise import *


def test_acceptance():
    assert classify_spend(80, 100) == "within"; assert classify_spend(120, 100) == "over"; assert classify_spend(0, 100)["decision"] in {"allow", "review"}
