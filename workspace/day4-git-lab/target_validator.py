allowed_targets = {"lab-server.local", "training-api.local"}
raw_target = "production-server.example"
normalized_target = raw_target.strip().lower()

if not normalized_target:
    status = "invalid"
elif normalized_target in allowed_targets:
    status = "authorized"
else:
    status = "outside allowlist"

result = {"input": raw_target, "normalized": normalized_target, "status": status}
print(status)
