#!/usr/bin/env python3
"""Run the reproducible, credential-free course verification suite."""
from __future__ import annotations
import subprocess
import sys
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def run(label: str, command: list[str], cwd: Path = ROOT) -> bool:
    print(f"\n== {label} ==")
    env = os.environ.copy()
    fallback_node = Path("/tmp/security-study-node/bin")
    if fallback_node.exists():
        env["PATH"] = f"{fallback_node}:{env.get('PATH', '')}"
    result = subprocess.run(command, cwd=cwd, env=env)
    print(f"{'PASS' if result.returncode == 0 else 'FAIL'}: {label}")
    return result.returncode == 0

def main() -> int:
    checks = [
        ("Root Python tests", [sys.executable, "-m", "unittest", "discover", "-v"]),
        ("Curriculum/export validation", [sys.executable, "tools/validate_course_export.py"]),
    ]
    ok = all(run(label, command) for label, command in checks)
    dashboard = ROOT / "dashboard"
    if dashboard.exists():
        npm = os.environ.get("NPM_BIN", "npm")
        if not __import__("shutil").which(npm):
            candidate = Path("/tmp/security-study-node/bin/npm")
            if candidate.exists():
                npm = str(candidate)
        node = str(Path("/tmp/security-study-node/bin/node")) if Path("/tmp/security-study-node/bin/node").exists() else "node"
        for label, command in [
            ("Dashboard typecheck", [node, "node_modules/typescript/bin/tsc", "--noEmit"]),
            ("Dashboard lint", [node, "node_modules/eslint/bin/eslint.js", ".", "--ignore-pattern", "dist", "--ignore-pattern", ".next"]),
            ("Dashboard unit tests", [node, "node_modules/vitest/vitest.mjs", "run"]),
            ("Dashboard production build", [node, "node_modules/vinext/dist/cli.js", "build"]),
        ]:
            ok = run(label, command, dashboard) and ok
    return 0 if ok else 1

if __name__ == "__main__":
    raise SystemExit(main())
