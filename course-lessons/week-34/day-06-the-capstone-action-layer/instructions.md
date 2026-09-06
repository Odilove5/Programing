# Lesson 34.06: the capstone action layer

**Phase:** Autonomous MarketingOps Capstone  
**Module:** Integrate Policy, Approval, and Execution  
**Track:** Capstone  
**Format:** Project  
**Status:** required

## Objective

Route every proposed side effect through policy and approval-aware adapters.

By the end of this lesson, you should be able to explain the concept,
implement a small deterministic example, test a normal and boundary case, and
describe how the capability supports the Autonomous MarketingOps AI without
giving an AI model unrestricted authority.

## Read first

1. Predict the inputs, outputs, state changes, and likely failure cases before
   running code.
2. Read the relevant official documentation linked from the dashboard lesson.
3. Work from a local fixture or fictional data. Do not add credentials or
   real customer data.

## Worked example

The dashboard provides a small, inspectable example for this lesson. Re-type
the important idea in your own words before opening the reference file.

## Student exercise

Open `exercise.py` and implement the requirements in your own words. Keep the
implementation small and observable. Your work should demonstrate these
capabilities:

- policy decisions
- approval binding
- adapter receipts
- denial behavior
- the capstone action layer

Run the exercise with:

```bash
python exercise.py
```

Add or run tests for a normal case, a boundary case, and one malformed,
denied, or failed case. Do not treat a passing happy-path example as proof of
correctness.

## Acceptance criteria

- The result is deterministic and has a clear input/output boundary.
- Invalid or out-of-scope input fails safely and explains what happened.
- The implementation does not bypass validation, policy, approval, or evidence
  boundaries introduced later in the course.
- You can explain the key decision without copying the reference file.

## Optional hints

- Start with the smallest input that can prove the rule.
- Name the state that changes and the condition that must eventually stop.
- Keep calculation and policy decisions in Python, not in prose or a model.

## What this unlocks in MarketingOps AI

This lesson is one bounded capability in the cumulative MarketingOps system.
The next layers can compose it only when its inputs, outputs, errors, and
evidence are explicit and testable.

## Reference workflow

Attempt the exercise first. Then compare your design with `solution.py`, run
the example again, and record one difference you would keep or change.
