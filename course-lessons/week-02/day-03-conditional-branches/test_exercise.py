"""Acceptance checks for this lesson. They intentionally fail until exercise.py is written."""

from exercise import *


def test_acceptance():
    assert evaluate_campaign({"spend": 20}, 50)["decision"] == "allow"
