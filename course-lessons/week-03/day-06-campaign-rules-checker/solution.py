def check_campaigns(campaigns, max_spend, max_cpa):
    violations, rejected = [], []
    for campaign in campaigns:
        try:
            spend = campaign["spend"]
            conversions = campaign["conversions"]
            if conversions == 0:
                rejected.append({"id": campaign.get("id"), "reason": "zero conversions"})
                continue
            cpa = spend / conversions
        except (KeyError, TypeError):
            rejected.append({"id": campaign.get("id"), "reason": "malformed record"})
            continue
        if spend > max_spend or cpa > max_cpa:
            violations.append({"id": campaign.get("id"), "spend": spend, "cpa": cpa})
    return {"violations": violations, "rejected": rejected}
