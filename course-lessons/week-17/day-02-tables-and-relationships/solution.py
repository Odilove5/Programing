"""Reference pattern for Lesson 17.02: tables and relationships.

This is deliberately a small reference model, not a replacement for the
student exercise or a future capstone implementation. Compare the boundaries,
naming, and failure handling after attempting exercise.py.
"""

REFERENCE = {
    "lesson": "17.02",
    "topic": 'tables and relationships',
    "input_contract": "explicit local fixture or fictional record",
    "success_contract": "deterministic structured result",
    "failure_contract": "specific, safe, inspectable failure",
    "capstone_capability": 'a SQLite evidence repository',
}


if __name__ == "__main__":
    for key, value in REFERENCE.items():
        print(f"{key}: {value}")
