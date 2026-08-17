"""Automated checks for the Week 2, Day 1 student program."""

from __future__ import annotations

import ast
import contextlib
import hashlib
import io
from pathlib import Path


PROGRAM = Path(__file__).with_name("ipv6_check.py")

CASES = [
    (
        "valid IPv4",
        {
            "address_text": "192.0.2.20",
            "is_active": True,
            "allowed_versions": {4, 6},
            "is_authorized": True,
        },
        ("4", "accepted", "all conditions passed"),
    ),
    (
        "valid IPv6",
        {
            "address_text": "2001:db8::10",
            "is_active": True,
            "allowed_versions": {4, 6},
            "is_authorized": True,
        },
        ("6", "accepted", "all conditions passed"),
    ),
    (
        "authorization missing",
        {
            "address_text": "192.0.2.20",
            "is_active": True,
            "allowed_versions": {4, 6},
            "is_authorized": False,
        },
        ("4", "rejected", "authorization is required"),
    ),
    (
        "inactive address",
        {
            "address_text": "192.0.2.20",
            "is_active": False,
            "allowed_versions": {4, 6},
            "is_authorized": True,
        },
        ("4", "rejected", "address is inactive"),
    ),
    (
        "IP version disallowed",
        {
            "address_text": "192.0.2.20",
            "is_active": True,
            "allowed_versions": {6},
            "is_authorized": True,
        },
        ("4", "rejected", "IP version is not allowed"),
    ),
    (
        "invalid IP text",
        {
            "address_text": "not-an-ip",
            "is_active": True,
            "allowed_versions": {4, 6},
            "is_authorized": True,
        },
        ("unknown", "rejected", "invalid IP address"),
    ),
]


class ReplaceInputs(ast.NodeTransformer):
    def __init__(self, values: dict[str, object]) -> None:
        self.values = values

    def visit_Assign(self, node: ast.Assign) -> ast.Assign:
        if len(node.targets) == 1 and isinstance(node.targets[0], ast.Name):
            name = node.targets[0].id
            if name in self.values:
                node.value = ast.parse(repr(self.values[name]), mode="eval").body
        return node


def run_case(source: str, values: dict[str, object]) -> list[str]:
    tree = ReplaceInputs(values).visit(ast.parse(source, filename=str(PROGRAM)))
    ast.fix_missing_locations(tree)
    output = io.StringIO()
    with contextlib.redirect_stdout(output):
        exec(compile(tree, str(PROGRAM), "exec"), {"__name__": "__main__"})
    return output.getvalue().strip().splitlines()


def main() -> None:
    original = PROGRAM.read_bytes()
    original_hash = hashlib.sha256(original).hexdigest()
    source = original.decode("utf-8")

    for name, values, expected in CASES:
        lines = run_case(source, values)
        expected_lines = [
            f"Address: {values['address_text']}",
            f"Version: {expected[0]}",
            f"Decision: {expected[1]}",
            f"Reason: {expected[2]}",
        ]
        if lines != expected_lines:
            raise AssertionError(
                f"FAIL {name}\nExpected: {expected_lines}\nObserved: {lines}"
            )
        print(f"PASS  {name}: {expected[1]} - {expected[2]}")

    current_hash = hashlib.sha256(PROGRAM.read_bytes()).hexdigest()
    if current_hash != original_hash:
        raise AssertionError("The student program changed during testing.")

    print(f"\n{len(CASES)} cases passed. The student file was not modified.")


if __name__ == "__main__":
    main()
