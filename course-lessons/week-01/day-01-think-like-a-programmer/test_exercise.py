"""Acceptance checks for this lesson. They intentionally fail until exercise.py is written."""

from exercise import *


def test_acceptance():
    assert campaign_preview("spring-search", 500.0, 20) == "spring-search: 20 leads from $500.00"
