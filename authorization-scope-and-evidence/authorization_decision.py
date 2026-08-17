# Fictional rules of engagement for a local training exercise.
authorized_targets = {"training-api.local"}
permitted_actions = {"collect-headers"}
start_hour = 9
end_hour = 12
maximum_rate = 5

# Proposed activity to evaluate. This program makes no network connection.
target = "training-api.local"
action = "collect-headers"
current_hour = 10
request_rate = 3
customer_data_observed = False

# Reject the activity as soon as one authorization rule fails.
if target not in authorized_targets:
    decision = "stop"
    reason = "target is outside the authorized scope"
elif current_hour < start_hour or current_hour >= end_hour:
    decision = "stop"
    reason = "current time is outside the authorized window"
elif action not in permitted_actions:
    decision = "stop"
    reason = "action is not permitted by the rules of engagement"
elif request_rate > maximum_rate:
    decision = "stop"
    reason = "request rate exceeds the approved limit"
elif customer_data_observed:
    decision = "stop"
    reason = "customer data triggered the mandatory stop condition"
else:
    decision = "proceed"
    reason = "all authorization checks passed"

# Produce a clear decision record for the operator.
print(f"Target: {target}")
print(f"Action: {action}")
print(f"Decision: {decision}")
print(f"Reason: {reason}")
