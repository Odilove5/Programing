# Explainable Rule Evaluator

A Python programming project that evaluates independent Boolean rules, uses
`all()` to aggregate their results, collects every failed rule with a list
comprehension, and produces an explainable nested decision record.

The program evaluates only fictional local-lab data and performs no network
activity.

## Run the program

```powershell
python rule_evaluator.py
```

## Run the automated tests

```powershell
python test_rule_evaluator.py
```

The harness checks success, independent failures, simultaneous failures,
inclusive boundaries, rule order, exact decision output, the `all([])` edge
case, and preservation of the student source file.
