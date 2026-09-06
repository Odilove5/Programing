def classify_spend(spend, limit):
    if spend < 0 or limit < 0:
        return "invalid"
    if spend > limit:
        return "over"
    return "within"
