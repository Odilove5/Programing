def policy_decision(action, context):
    if action in {"read_metrics", "generate_draft"}:
        return {"decision": "allow", "reason": "low-risk read or draft"}
    if action in {"publish", "change_budget"}:
        return {"decision": "approval-required", "reason": "human approval required"}
    return {"decision": "deny", "reason": "unknown action"}
