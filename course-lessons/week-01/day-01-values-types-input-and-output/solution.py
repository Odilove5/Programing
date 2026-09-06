def campaign_preview(name, spend, leads):
    return f"{name}: {leads} leads from ${spend:.2f}"

if __name__ == "__main__":
    print(campaign_preview("spring-search", 500.0, 20))
