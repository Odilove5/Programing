"""Acceptance checks for this lesson. They intentionally fail until exercise.py is written."""

from pathlib import Path
from exercise import *


def test_acceptance():
    assert str(Path("workspace") / "fixtures" / "campaigns.json") == "workspace/fixtures/campaigns.json"
