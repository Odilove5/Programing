"""Acceptance checks for this lesson. They intentionally fail until exercise.py is written."""

from exercise import *


def test_acceptance():
    assert summarize_campaigns([]) == {"names": [], "channels": set(), "active": []}; assert summarize_campaigns([])["names"] == []
