def summarize_campaigns(campaigns):
    names, channels, active = [], set(), []
    for campaign in campaigns:
        name = campaign["name"]
        channel = campaign["channel"]
        names.append(name)
        channels.add(channel)
        if campaign.get("status") == "active":
            active.append(campaign)
    return {"names": names, "channels": channels, "active": active}
