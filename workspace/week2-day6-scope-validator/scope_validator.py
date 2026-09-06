# Week 2, Day 6: scope-aware target validator

def normalize_target(raw_target):
    return raw_target.strip().lower()

def validate_target(normalized_target):
    if not normalized_target:
        return {
            "valid": False,
            "reason": "target is empty",
            }
    if " " in normalized_target:
        return {
            "valid": False,
            "reason": "target contains spaces",
            }
    return {
        "valid": True,
        "reason": "target passed validation",
        }

def is_target_allowed(target, allowed_targets):
    return target in allowed_targets

def is_port_allowed(port, minimum, maximum):
    return minimum <= port <= maximum

def evaluate_target(raw_target, port, allowed_targets):
    normalized_target = normalize_target(raw_target)
    validation = validate_target(normalized_target)

    if not validation["valid"]:
        return {
            "target": normalized_target,
            "port": port,
            "decision": "rejected",
            "reason": validation["reason"],
            }
    if not is_target_allowed(normalized_target, allowed_targets):
        return {
            "target": normalized_target,
            "port": port,
            "decision": "rejected",
            "reason": "target is not allowed",
            }
    if not is_port_allowed(port, 1, 65535):
        return {
            "target": normalized_target,
            "port": port,
            "decision": "rejected",
            "reason": "port must be between 1 and 65535",
            }
    return {
            "target": normalized_target,
            "port": port,
            "decision": "accepted",
            "reason": "target and port passed all checks",
        }
def print_report(result):
    print(f'Target: {result["target"]}')
    print(f'Port: {result["port"]}')
    print(f'Decision: {result["decision"]}')
    print(f'Reason: {result["reason"]}')

if __name__ == "__main__":
    allowed_targets = {
        "training-api.local",
        "lab-server.local",
        }

    raw_target = "   TRAINING-API.LOCAL   "
    port = 8443

    result = evaluate_target(
        raw_target,
        port,
        allowed_targets,
        )

    print_report(result)
