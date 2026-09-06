def authorized_target_report(records, allowed):
    accepted, rejected = [], []
    for raw in records:
        value = raw.strip().lower()
        if not value:
            rejected.append({"input": raw, "reason": "empty"})
        elif value not in allowed:
            rejected.append({"input": raw, "normalized": value, "reason": "out of scope"})
        else:
            accepted.append({"input": raw, "normalized": value})
    return {"accepted": accepted, "rejected": rejected}
