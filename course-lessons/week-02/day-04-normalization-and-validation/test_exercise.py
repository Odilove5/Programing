"""Acceptance checks for this lesson. They intentionally fail until exercise.py is written."""

from exercise import *


def test_acceptance():
    assert classify_path("__pycache__/x.pyc") == "noise"; assert classify_path("exercise.py") == "source"; assert classify_path(".DS_Store")["category"] == "noise"
