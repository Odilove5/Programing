"""Automated checks for the Week 2, Day 5 student program."""

from __future__ import annotations

import ast
import contextlib
import hashlib
import io
from pathlib import Path


PROGRAM = Path(__file__).with_name("rule_evaluator.py")

CASES = [
    (
        "all rules pass",
        "training-api.local",
        "read-status",
        True,
        5,
        [],
    ),
    (
        "target rejected",
        "production.example",
        "read-status",
        True,
        5,
        ["target_allowed"],
    ),
    (
        "action rejected",
        "training-api.local",
        "delete-record",
        True,
        5,
        ["action_allowed"],
    ),
    (
        "approval inactive",
        "training-api.local",
        "read-status",
        False,
        5,
        ["approval_active"],
    ),
    (
        "limit below range",
        "training-api.local",
        "read-status",
        True,
        0,
        ["limit_allowed"],
    ),
    (
        "limit above range",
        "training-api.local",
        "read-status",
        True,
        11,
        ["limit_allowed"],
    ),
    (
        "lower boundary",
        "training-api.local",
        "read-status",
        True,
        1,
        [],
    ),
    (
        "upper boundary",
        "training-api.local",
        "read-status",
        True,
        10,
        [],
    ),
    (
        "multiple failures",
        "production.example",
        "delete-record",
        False,
        11,
        [
            "target_allowed",
            "action_allowed",
            "approval_active",
            "limit_allowed",
        ],
    ),
]


class ReplaceInputs(ast.NodeTransformer):
    def __init__(
        self,
        target: str,
        action: str,
        approval_active: bool,
        request_limit: int,
    ) -> None:
        self.values = {
            "target": target,
            "action": action,
            "approval_active": approval_active,
            "request_limit": request_limit,
        }

    def visit_Assign(self, node: ast.Assign) -> ast.Assign:
        if len(node.targets) == 1 and isinstance(node.targets[0], ast.Name):
            name = node.targets[0].id
            if name in self.values:
                node.value = ast.parse(repr(self.values[name]), mode="eval").body
        return node


def run_case(
    source: str,
    target: str,
    action: str,
    approval_active: bool,
    request_limit: int,
) -> tuple[dict[str, object], list[str]]:
    tree = ReplaceInputs(target, action, approval_active, request_limit).visit(
        ast.parse(source, filename=str(PROGRAM))
    )
    ast.fix_missing_locations(tree)
    namespace: dict[str, object] = {"__name__": "__main__"}
    output = io.StringIO()
    with contextlib.redirect_stdout(output):
        exec(compile(tree, str(PROGRAM), "exec"), namespace)
    return namespace["result"], output.getvalue().strip().splitlines()


def main() -> None:
    original = PROGRAM.read_bytes()
    original_hash = hashlib.sha256(original).hexdigest()
    source = original.decode("utf-8")
    expected_rule_order = [
        "target_allowed",
        "action_allowed",
        "approval_active",
        "limit_allowed",
    ]

    for name, target, action, approval, limit, expected_failures in CASES:
        result, output = run_case(source, target, action, approval, limit)
        expected_passed = not expected_failures
        expected_decision = "accepted" if expected_passed else "rejected"
        expected_reason = (
            "all rules passed" if expected_passed else "one or more rules failed"
        )

        assert list(result["rule_results"]) == expected_rule_order, name
        assert result["policy_passed"] is expected_passed, name
        assert result["failed_rules"] == expected_failures, name
        assert result["decision"] == expected_decision, name
        assert result["reason"] == expected_reason, name
        assert output[-2] == f"Decision: {expected_decision}", name
        assert output[-1] == f"Reason: {expected_reason}", name
        print(
            f"PASS  {name}: {expected_decision} - "
            f"{expected_failures or 'no failed rules'}"
        )

    if all([]) is not True:
        raise AssertionError("Python's documented all([]) behavior changed.")
    print("PASS  empty iterable: all([]) is True; required rules must be enforced")

    if hashlib.sha256(PROGRAM.read_bytes()).hexdigest() != original_hash:
        raise AssertionError("The student program changed during testing.")

    print(f"\n{len(CASES) + 1} checks passed. The student file was not modified.")


if __name__ == "__main__":
    main()
