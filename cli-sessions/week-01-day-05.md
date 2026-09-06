### Brief overview

The lesson introduced authorization and rules of engagement before any exercise began. Authorization was defined as explicit permission for specified people, targets, actions, and times. Scope identified what was included, while an allowlist represented approved targets in a form a program could enforce.

Rules of engagement were explained as the operational boundaries of an assessment: permitted and prohibited actions, time windows, rate limits, data handling, stop conditions, communications, and reporting. The lesson emphasized that an authorized target does not make every action authorized and that unclear permission must default to stop.

Evidence, findings, impact, mitigation, and retesting were introduced as a connected reporting workflow. Raw output alone was not treated as a finding; it must be connected to a requirement, test, observation, consequence, corrective action, and safe verification.

### Concepts learned

- Authorization
- Scope and target allowlists
- Rules of engagement
- Permitted and prohibited actions
- Testing windows and rate limits
- Mandatory stop conditions
- Safe defaults
- Evidence, findings, impact, mitigation, and retesting

### Realistic scenario

The fictional engagement authorized passive header collection against `training-api.local` between 09:00 and 12:00, limited activity to five requests per minute, prohibited authentication attempts, and required an immediate stop if customer data appeared.

The student correctly recognized that a login attempt remained prohibited even when the target and time were authorized. During guided practice, the student also correctly approved a header-collection activity when the target, time, action, rate, and stop-condition checks all passed.

### Exercises completed

1. Distinguish an authorized target from an authorized action.
2. Evaluate a complete proposed activity and choose `proceed` when every rule passed.
3. Review a complete beginner reference implementation.
4. Rebuild the policy sets and numeric limits from a blank file.
5. Rebuild the proposed-activity variables with correct string, integer, and Boolean types.
6. Write the outside-scope target branch.
7. Write the authorized time-window branch using `<`, `>=`, and `or`.
8. Write the permitted-action membership branch.
9. Write the rate-limit branch and correct a mismatched variable name.
10. Write the Boolean stop-condition branch and correct assignment-versus-testing syntax.
11. Write the successful `else` decision.
12. Write the four-line f-string decision report.
13. Assemble the complete program independently in IDLE.
14. Run and verify the successful `proceed` path.
15. Predict, run, and verify the customer-data mandatory stop path.

### Errors and misconceptions corrected

- Replaced strings with single-item sets for authorized targets and actions.
- Corrected `collected-headers` to the exact approved action `collect-headers`.
- Added a missing colon after the first `if` condition.
- Moved the time comparison onto the same line as `elif`.
- Corrected `requested_rate` to the declared variable `request_rate`.
- Replaced `customer_data_observed = True` inside a condition with the direct Boolean test `elif customer_data_observed:`.
- Used consistent block indentation and kept final report statements outside the decision branches.

### Verified successful output

```text
Target: training-api.local
Action: collect-headers
Decision: proceed
Reason: all authorization checks passed
```

### Verified stop-condition output

```text
Target: training-api.local
Action: collect-headers
Decision: stop
Reason: customer data triggered the mandatory stop condition
```

### Skipped by student choice

The outside-scope target, outside-window time, prohibited-action, and excessive-rate failure tests were explained but not executed. The archive does not count them as completed exercises.
