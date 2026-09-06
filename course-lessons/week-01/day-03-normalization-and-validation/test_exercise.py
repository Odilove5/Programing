"""Acceptance checks for this lesson. They intentionally fail until exercise.py is written."""

from exercise import *


def test_acceptance():
    assert validate_campaign_id("  SPRING  ")["value"] == "spring"; assert not validate_campaign_id("   ")["valid"]; assert validate_campaign_id(" A ")["value"] == "a"; assert validate_campaign_id("a b")["valid"] is False
