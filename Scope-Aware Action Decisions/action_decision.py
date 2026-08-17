allowed_actions = {"collect-headers", "read-status"}
raw_action = "   READ-STATUS   "
is_active = True
normalized_action = raw_action.strip().lower()
limit_text = "5"
limit = None

decision = "rejected"
reason = "validation has not completed"

try:
    limit = int(limit_text)
except ValueError:
    reason = "limit must be a whole number"
else:
    if not normalized_action:
        reason = "action is empty"
    elif normalized_action not in allowed_actions:
        reason = "action is not allowed"
    elif not is_active:
        reason = "operation is inactive"
    elif limit < 1 or limit > 10:
        reason = "limit must be between 1 and 10"
    else:
        decision = "accepted"
        reason = "all checks passed"

result = {
    "input_action": raw_action,
    "normalized_action": normalized_action,
    "limit": limit,
    "decision": decision,
    "reason": reason,
}

print(f'Input action: {result["input_action"]}')
print(f'Normalized action: {result["normalized_action"]}')
print(f'Limit: {result["limit"]}')
print(f'Decision: {result["decision"]}')
print(f'Reason: {result["reason"]}')
