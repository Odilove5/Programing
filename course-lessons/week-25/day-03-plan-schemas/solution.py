"""Reference pattern for Lesson 25.03: plan schemas.

This is deliberately a small reference model, not a replacement for the
student exercise or a future capstone implementation. Compare the boundaries,
naming, and failure handling after attempting exercise.py.
"""

REFERENCE = {
    "lesson": "25.03",
    "topic": 'plan schemas',
    "input_contract": "explicit local fixture or fictional record",
    "success_contract": "deterministic structured result",
    "failure_contract": "specific, safe, inspectable failure",
    "capstone_capability": 'a campaign experiment plan',
}


if __name__ == "__main__":
    for key, value in REFERENCE.items():
        print(f"{key}: {value}")
