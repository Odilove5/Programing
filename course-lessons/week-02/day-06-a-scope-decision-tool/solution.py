def validate_target(raw, allowed):
    value = raw.strip().lower()
    if not value:
        return {"accepted": False, "input": raw, "reason": "empty"}
    if " " in value:
        return {"accepted": False, "input": raw, "normalized": value, "reason": "contains spaces"}
    if value not in allowed:
        return {"accepted": False, "input": raw, "normalized": value, "reason": "out of scope"}
    return {"accepted": True, "input": raw, "normalized": value}
