# Operation Decision Record

  A Python programming exercise that normalizes an action, converts a numeric
  limit, applies ordered validation rules, and produces a structured result.

## Run the program

  ```python
  python action_decision.py

## Expected output

  Input action:    READ-STATUS
  Normalized action: read-status
  Limit: 5
  Decision: accepted
  Reason: all checks passed

## Programming concepts

  - String normalization
  - Integer conversion
  - Safe default values
  - try, except, and else
  - if, elif, and else
  - Set membership
  - Numeric range validation
  - Dictionaries
  - f-strings

 ## Validation order

 The program validates conversion, required input, allowlist membership,
 active state, and numeric boundaries before accepting an operation.

The JSON report keeps the decision evidence structured and reusable.