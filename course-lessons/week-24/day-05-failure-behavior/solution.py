"""Reference pattern for Lesson 24.05: failure behavior.

This is deliberately a small reference model, not a replacement for the
student exercise or a future capstone implementation. Compare the boundaries,
naming, and failure handling after attempting exercise.py.
"""

REFERENCE = {
    "lesson": "24.05",
    "topic": 'failure behavior',
    "input_contract": "explicit local fixture or fictional record",
    "success_contract": "deterministic structured result",
    "failure_contract": "specific, safe, inspectable failure",
    "capstone_capability": 'read-only marketing tools',
}


if __name__ == "__main__":
    for key, value in REFERENCE.items():
        print(f"{key}: {value}")
