"""Week 3, Day 1: classify multiple authorized lab targets."""

def classify_targets(raw_targets, allowed_targets):
    """Classify targets as authorized or unauthorized."""

    accepted_targets = []
    rejected_targets = []

    for raw_target in raw_targets:
        normalized_target = raw_target.strip().lower()
        if not normalized_target:
            rejected_targets.append({
                "input": raw_target,
                "reason": "target is empty",
            })
            continue
        if " " in normalized_target:
            rejected_targets.append({
                "input": raw_target,
                "reason": "target contains spaces",
            })
            continue
        if normalized_target not in allowed_targets:
            rejected_targets.append({
                "input": raw_target,
                "normalized": normalized_target,
                "reason": "target is not allowed",
            })
            continue
        accepted_targets.append({
            "input": raw_target,
            "normalized": normalized_target,
        })
    return {
        "accepted": accepted_targets,
        "rejected": rejected_targets,
    }


if __name__ == "__main__":
    allowed_targets = {
        "lab-server.local",
        "training-api.local",
    }

    raw_targets = [
        "  LAB-SERVER.LOCAL  ",
        "",
        "TRAINING API.LOCAL",
        "production.example",
        " Training-API.Local ",
    ]

    results = classify_targets(raw_targets, allowed_targets)

    print(f'Accepted: {len(results["accepted"])}')
    print(f'Rejected: {len(results["rejected"])}')

    print("\nAccepted targets:")
    for accepted_target in results["accepted"]:
        print(f'- {accepted_target["normalized"]}')

    print("\nRejected targets:")
    for rejected_target in results["rejected"]:
        print(f'- "{rejected_target["input"]}": {rejected_target["reason"]}')
