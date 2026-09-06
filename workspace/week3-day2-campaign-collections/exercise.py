"""Week 3 Day 2: represent campaign data with collections.

Student exercise: implement the function and the small demonstration below.
Keep the implementation data-driven; do not hard-code the expected output.
"""


def summarize_campaigns(campaigns):
    """Return names, unique channels, and active campaign records.

    TODO: implement this from the lesson requirements.
    """
    raise NotImplementedError


if __name__ == "__main__":
    campaigns = [
        {"name": "Search", "channel": "paid", "status": "active"},
        {"name": "Social", "channel": "organic", "status": "paused"},
        {"name": "Retargeting", "channel": "paid", "status": "active"},
    ]

    print(summarize_campaigns(campaigns))
