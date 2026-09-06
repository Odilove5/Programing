def authorize_action(action, scope, policy):
    if action not in policy:
        return {"allowed": False, "decision": "deny", "reason": "missing policy"}
    decision = policy[action]
    return {"allowed": decision == "allow", "decision": decision, "action": action, "scope": scope}
