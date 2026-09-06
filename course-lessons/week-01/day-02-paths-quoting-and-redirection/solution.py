from pathlib import Path

BASE = Path("workspace")
fixture = BASE / "fixtures" / "campaigns.json"
print(f"fixture={fixture}")
print("mode=dry-run")
