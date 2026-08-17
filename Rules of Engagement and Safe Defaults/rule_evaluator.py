allowed_targets = {"training-api.local", "lab-server.local"}
allowed_actions = {"read-status", "collect-headers"}

target = "training-api.local"
action = "read-status"
approval_active = True
request_limit = 5

rule_results = {
    "target_allowed": target in allowed_targets,
    "action_allowed": action in allowed_actions,
    "approval_active": approval_active,
    "limit_allowed": 1 <= request_limit <= 10,
    }

policy_passed = all(rule_results.values())
failed_rules = [
    name
    for name, passed in rule_results.items()
    if not passed
    ]

decision = "accepted" if policy_passed else "rejected"
reason = "all rules passed" if policy_passed else "one or more rules failed"

result = {
    "target": target,
    "action": action,
    "rule_results": rule_results,
    "policy_passed": policy_passed,
    "failed_rules": failed_rules,
    "decision": decision,
    "reason": reason,
}

for name, passed in result["rule_results"].items():
    print(f"{name}: {passed}")

print(f'Policy passed: {result["policy_passed"]}')
print(f'Failed rules: {result["failed_rules"]}')
print(f'Decision: {result["decision"]}')
print(f'Reason: {result["reason"]}')
