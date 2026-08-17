from contextlib import redirect_stdout
from io import StringIO
from pathlib import Path
import re


STUDENT_FILE = Path(__file__).with_name("student_target_normalizer.py")
ORIGINAL_SOURCE = STUDENT_FILE.read_text(encoding="utf-8")


def with_assignment(source, variable, value):
    """Replace one top-level training input without changing the student file."""
    pattern = rf"^{re.escape(variable)}\s*=.*$"
    updated, count = re.subn(pattern, f"{variable} = {value!r}", source, count=1, flags=re.MULTILINE)
    if count != 1:
        raise AssertionError(f"Could not find exactly one assignment for {variable}")
    return updated


def run_case(name, changes, expected):
    source = ORIGINAL_SOURCE
    for variable, value in changes.items():
        source = with_assignment(source, variable, value)

    namespace = {"__name__": f"test_case_{name}"}
    with redirect_stdout(StringIO()):
        exec(compile(source, str(STUDENT_FILE), "exec"), namespace)

    result = namespace["result"]
    observed = {key: result[key] for key in expected}
    if observed != expected:
        raise AssertionError(f"{name}: expected {expected}, observed {observed}")
    print(f"PASS  {name}: {observed['decision']} - {observed['reason']}")


CASES = [
    (
        "authorized target",
        {},
        {"port": 8443, "decision": "authorized", "reason": "target and port passed validation"},
    ),
    (
        "empty hostname",
        {"raw_hostname": "     "},
        {"port": None, "decision": "stop", "reason": "hostname is empty"},
    ),
    (
        "hostname with internal space",
        {"raw_hostname": "training api.local"},
        {"port": None, "decision": "stop", "reason": "hostname contains spaces"},
    ),
    (
        "non-numeric port",
        {"port_text": "HTTPS"},
        {"port": None, "decision": "stop", "reason": "port must be a whole number"},
    ),
    (
        "port below range",
        {"port_text": "0"},
        {"port": 0, "decision": "stop", "reason": "port must be between 1 and 65535"},
    ),
    (
        "port above range",
        {"port_text": "65536"},
        {"port": 65536, "decision": "stop", "reason": "port must be between 1 and 65535"},
    ),
    (
        "outside allowlist",
        {"raw_hostname": "production-api.example"},
        {"port": 8443, "decision": "stop", "reason": "target is outside the authorized allowlist"},
    ),
]


for case_name, case_changes, case_expected in CASES:
    run_case(case_name, case_changes, case_expected)

print(f"\n{len(CASES)} cases passed. The student file was not modified.")
