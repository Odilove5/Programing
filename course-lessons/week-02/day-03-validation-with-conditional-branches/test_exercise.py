"""Acceptance checks for this lesson. They intentionally fail until exercise.py is written."""

from exercise import *


def test_acceptance():
    assert evaluate_campaign({"spend": 20}, 50)["decision"] == "allow"
    assert evaluate_campaign({"id": "x", "spend": 0}, 10)["decision"] == "allow"
    assert evaluate_campaign({"spend": 11}, 10)["decision"] == "deny"
    assert evaluate_campaign({}, 10)["reason"] == "invalid spend"
