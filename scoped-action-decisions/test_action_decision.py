"""Automated checks for the Week 2, Day 3 student program."""

from __future__ import annotations

import ast
import contextlib
import hashlib
import io
from pathlib import Path


PROGRAM = Path(__file__).with_name("action_decision.py")

CASES = [
    ("baseline", "   READ-STATUS   ", "5", True, "accepted", "all checks passed", "5"),
    ("lower boundary", "read-status", "1", True, "accepted", "all checks passed", "1"),
    ("upper boundary", "collect-headers", "10", True, "accepted", "all checks passed", "10"),
    ("invalid limit", "read-status", "five", True, "rejected", "limit must be a whole number", "None"),
    ("empty action", "   ", "5", True, "rejected", "action is empty", "5"),
    ("unknown action", "delete-records", "5", True, "rejected", "action is not allowed", "5"),
    ("inactive operation", "read-status", "5", False, "rejected", "operation is inactive", "5"),
    ("limit below range", "read-status", "0", True, "rejected", "limit must be between 1 and 10", "0"),
    ("limit above range", "read-status", "11", True, "rejected", "limit must be between 1 and 10", "11"),
]


class ReplaceInputs(ast.NodeTransformer):
    def __init__(self, raw_action: str, limit_text: str, is_active: bool) -> None:
        self.values = {
            "raw_action": raw_action,
            "limit_text": limit_text,
            "is_active": is_active,
        }

    def visit_Assign(self, node: ast.Assign) -> ast.Assign:
        if len(node.targets) == 1 and isinstance(node.targets[0], ast.Name):
            name = node.targets[0].id
            if name in self.values:
                node.value = ast.parse(repr(self.values[name]), mode="eval").body
        return node


def run_case(source: str, raw_action: str, limit_text: str, is_active: bool) -> list[str]:
    tree = ReplaceInputs(raw_action, limit_text, is_active).visit(
        ast.parse(source, filename=str(PROGRAM))
    )
    ast.fix_missing_locations(tree)
    output = io.StringIO()
    with contextlib.redirect_stdout(output):
        exec(compile(tree, str(PROGRAM), "exec"), {"__name__": "__main__"})
    return output.getvalue().strip().splitlines()


def main() -> None:
    original = PROGRAM.read_bytes()
    original_hash = hashlib.sha256(original).hexdigest()
    source = original.decode("utf-8")

    for name, raw_action, limit_text, is_active, decision, reason, limit in CASES:
        observed = run_case(source, raw_action, limit_text, is_active)
        expected = [
            f"Input action: {raw_action}",
            f"Normalized action: {raw_action.strip().lower()}",
            f"Limit: {limit}",
            f"Decision: {decision}",
            f"Reason: {reason}",
        ]
        if observed != expected:
            raise AssertionError(
                f"FAIL {name}\nExpected: {expected}\nObserved: {observed}"
            )
        print(f"PASS  {name}: {decision} - {reason}")

    if hashlib.sha256(PROGRAM.read_bytes()).hexdigest() != original_hash:
        raise AssertionError("The student program changed during testing.")

    print(f"\n{len(CASES)} cases passed. The student file was not modified.")


if __name__ == "__main__":
    main()
