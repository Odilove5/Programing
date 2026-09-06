def evaluate_campaign(record, limit):
    spend = record.get("spend")
    if not isinstance(spend, (int, float)):
        return {"decision": "deny", "reason": "invalid spend"}
    if spend < 0:
        return {"decision": "deny", "reason": "negative spend"}
    return {"decision": "deny" if spend > limit else "allow", "reason": "over limit" if spend > limit else "within limit"}
