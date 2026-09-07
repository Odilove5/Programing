#!/usr/bin/env python3
"""Run the portable, credential-free course verification suite."""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DASHBOARD = ROOT / "dashboard"
MINIMUM_PYTHON = (3, 10)
MINIMUM_NODE = (22, 13, 0)


def run(label: str, command: list[str], cwd: Path = ROOT) -> bool:
    print(f"\n== {label} ==", flush=True)
    result = subprocess.run(command, cwd=cwd)
    print(f"{'PASS' if result.returncode == 0 else 'FAIL'}: {label}", flush=True)
    return result.returncode == 0


def require_tool(name: str) -> str | None:
    executable = shutil.which(name)
    if executable is None:
        print(f"FAIL: required command not found: {name}", file=sys.stderr)
    return executable


def parse_node_version(value: str) -> tuple[int, int, int] | None:
    try:
        major, minor, patch = value.removeprefix("v").split(".", maxsplit=2)
        return int(major), int(minor), int(patch)
    except ValueError:
        return None


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--install",
        action="store_true",
        help="run npm ci before dashboard verification",
    )
    parser.add_argument(
        "--ci",
        action="store_true",
        help="require dependencies to be preinstalled by the CI workflow",
    )
    args = parser.parse_args()

    if sys.version_info < MINIMUM_PYTHON:
        print(
            "FAIL: Python 3.10 or newer is required "
            f"(found {sys.version_info.major}.{sys.version_info.minor})",
            file=sys.stderr,
        )
        return 1

    checks = [
        ("Root Python tests", [sys.executable, "-m", "unittest", "discover", "-v"]),
        (
            "Curriculum and lesson export validation",
            [sys.executable, "tools/validate_course_export.py"],
        ),
    ]
    ok = all(run(label, command) for label, command in checks)

    npm = require_tool("npm")
    node = require_tool("node")
    if npm is None or node is None:
        return 1

    version = subprocess.run(
        [node, "--version"], capture_output=True, text=True, check=False
    ).stdout.strip()
    print(f"Node runtime: {version}")
    parsed_version = parse_node_version(version)
    if parsed_version is None or parsed_version < MINIMUM_NODE:
        print(
            "FAIL: Node.js 22.13.0 or newer is required "
            f"(found {version or 'an unknown version'})",
            file=sys.stderr,
        )
        return 1

    modules = DASHBOARD / "node_modules"
    if args.install:
        ok = run("Install dashboard dependencies", [npm, "ci"], DASHBOARD) and ok
    elif not modules.is_dir():
        mode = "CI setup must run npm ci first." if args.ci else "Run again with --install."
        print(f"FAIL: dashboard dependencies are not installed. {mode}", file=sys.stderr)
        return 1

    for label, script in (
        ("Dashboard typecheck", "typecheck"),
        ("Dashboard lint", "lint"),
        ("Dashboard unit tests", "test"),
        ("Dashboard production build", "build"),
    ):
        ok = run(label, [npm, "run", script], DASHBOARD) and ok

    print("\nCourse verification passed." if ok else "\nCourse verification failed.")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
