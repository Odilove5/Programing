# Scope-Aware Target Validator

A Week 2 Python project demonstrating functions, parameters, return values,
local variables, guard clauses, function composition, a main-entry guard, and
formal testing with Python's standard-library `unittest` framework.

The program validates fictional local-lab target data only. It performs no
network activity.

## Run the program

```powershell
python scope_validator.py
```

## Run the tests

```powershell
python -m unittest -v
```

The suite covers normalization, target validation, inclusive port boundaries,
an accepted integration path, and five integrated rejection paths.
