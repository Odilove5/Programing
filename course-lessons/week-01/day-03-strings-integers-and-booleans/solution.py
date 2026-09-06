def validate_campaign_id(raw):
    value = raw.strip().lower()
    if not value:
        return {"valid": False, "reason": "empty"}
    if " " in value:
        return {"valid": False, "reason": "contains spaces"}
    return {"valid": True, "value": value}
