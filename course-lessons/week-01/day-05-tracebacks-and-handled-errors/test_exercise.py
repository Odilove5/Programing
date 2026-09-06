"""Acceptance checks for this lesson. They intentionally fail until exercise.py is written."""

from exercise import *


def test_acceptance():
    assert authorize_action("publish", "demo", {})["decision"] == "deny"
