"""Acceptance checks for this lesson. They intentionally fail until exercise.py is written."""

from exercise import *


def test_acceptance():
    assert authorized_target_report([" DEMO ", "bad"], {"demo"})["accepted"][0]["normalized"] == "demo"; assert authorized_target_report([], {"demo"}) == {"accepted": [], "rejected": []}
