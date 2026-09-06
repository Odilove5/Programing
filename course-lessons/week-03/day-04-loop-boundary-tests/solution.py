"""Reference pattern for Lesson 03.04: loop boundary tests.

This is deliberately a small reference model, not a replacement for the
student exercise or a future capstone implementation. Compare the boundaries,
naming, and failure handling after attempting exercise.py.
"""

REFERENCE = {
    "lesson": "03.04",
    "topic": 'loop boundary tests',
    "input_contract": "explicit local fixture or fictional record",
    "success_contract": "deterministic structured result",
    "failure_contract": "specific, safe, inspectable failure",
    "capstone_capability": 'a blank-file campaign rules checker',
}


if __name__ == "__main__":
    for key, value in REFERENCE.items():
        print(f"{key}: {value}")
