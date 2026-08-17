import ipaddress

address_text = "192.0.2.20"
is_active = True
allowed_versions = {4,6}
is_authorized = True


address = None
decision = "rejected"
reason = "validation has not completed"

try:
    address = ipaddress.ip_address(address_text)
except ValueError:
    decision = "rejected"
    reason = "invalid IP address"
else:
    if not is_authorized:
        decision = "rejected"
        reason = "authorization is required"
    elif not is_active:
        decision = "rejected"
        reason = "address is inactive"
    elif address.version not in allowed_versions:
        decision = "rejected"
        reason = "IP version is not allowed"
    else:
        decision = "accepted"
        reason = "all conditions passed"

version = address.version if address is not None else "unknown"

print(f"Address: {address_text}")
print(f"Version: {version}")
print(f"Decision: {decision}")
print(f"Reason: {reason}")
