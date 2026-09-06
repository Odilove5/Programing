# Explicitly authorized fictional targets for this local training project.
authorized_targets = {"lab-server.local", "training-api.local"}

# Raw target data to normalize and validate.
target_name = "Training API"
raw_hostname = "   TRAINING-API.LOCAL   "
port_text = "8443"

# Normalize the hostname but preserve the original value for evidence.
normalized_hostname = raw_hostname.strip().lower()

# Start with a safe default. The program changes this only after every check passes.
decision = "stop"
reason = "validation has not completed"
port = None

# Validate the hostname before evaluating authorization.
if not normalized_hostname:
    reason = "hostname is empty"
elif " " in normalized_hostname:
    reason = "hostname contains spaces"
else:
    # Convert and validate the port without allowing malformed text to crash the tool.
    try:
        port = int(port_text)

        if port < 1 or port > 65535:
            reason = "port must be between 1 and 65535"
        elif normalized_hostname not in authorized_targets:
            reason = "target is outside the authorized allowlist"
        else:
            decision = "authorized"
            reason = "target and port passed validation"
    except ValueError:
        reason = "port must be a whole number"

# Store the decision as structured data for later JSON or report generation.
result = {
    "target_name": target_name,
    "original_hostname": raw_hostname,
    "normalized_hostname": normalized_hostname,
    "port": port,
    "decision": decision,
    "reason": reason,
}

# Display a clear operator report. This program makes no network connection.
print(f"Target: {result['target_name']}")
print(f"Original hostname: \"{result['original_hostname']}\"")
print(f"Normalized hostname: \"{result['normalized_hostname']}\"")
print(f"Port: {result['port']}")
print(f"Decision: {result['decision']}")
print(f"Reason: {result['reason']}")
