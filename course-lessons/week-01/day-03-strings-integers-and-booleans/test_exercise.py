"""Acceptance checks for this lesson. They intentionally fail until exercise.py is written."""

from exercise import *


def test_acceptance():
    assert validate_campaign_id("  SPRING  ")["value"] == "spring"; assert not validate_campaign_id("   ")["valid"]
