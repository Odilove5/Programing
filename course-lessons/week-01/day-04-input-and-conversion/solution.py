from pathlib import Path

Path("CHANGELOG.md").write_text("- Add one focused lesson change.\n", encoding="utf-8")
print("Next: git diff, git add CHANGELOG.md, git commit")
