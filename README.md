# Programming and Security Automation Lessons

This repository documents completed programming lessons and practical security-automation projects. Folder names describe the concept learned or the tool built so readers can understand the work without knowing the original course schedule.

## Completed lessons

- [Values and Variables](Values%20and%20Variables) — data types, strings, input, output, and meaningful variable names.
- [Bash Paths, Quoting, and Redirection](Bash%20Paths%2C%20Quoting%2C%20and%20Redirection) — safe path handling, shell quoting, and file-output operators.
- [Operator Input Normalization and Validation](Operator%20Input%20Normalization%20and%20Validation) — converting untrusted operator input into validated internal data.
- [Git Repositories and Useful Commits](Git%20Repositories%20and%20Useful%20Commits) — repository creation, focused changes, and descriptive commit history.
- [Authorization Scope and Evidence](Authorization%20Scope%20and%20Evidence) — explicit authorization checks, scope controls, and evidence-driven decisions.
- [Conditionals, Boolean Logic, and Imports](Conditionals%2C%20Boolean%20Logic%2C%20and%20Imports) — branching, combined conditions, and Python module reuse.
- [PowerShell Cmdlets and Object Pipelines](PowerShell%20Cmdlets%20and%20Object%20Pipelines) — structured process data, filtering, selection, and export.
- [Scope-Aware Action Decisions](Scope-Aware%20Action%20Decisions) — making bounded operational decisions from validated inputs.
- [Git Staging and Diff Inspection](Git%20Staging%20and%20Diff%20Inspection) — reviewing changes before creating precise commits.
- [Rules of Engagement and Safe Defaults](Rules%20of%20Engagement%20and%20Safe%20Defaults) — explainable rule evaluation and fail-closed behavior.

## Integrated labs

- [Sentinel — Target Data Normalizer](Sentinel%20-%20Target%20Data%20Normalizer) — normalizes target and port data, validates authorization boundaries, and rejects unsafe input with test evidence.
- [ScopeGuard — Authorized Target Validator](ScopeGuard%20-%20Authorized%20Target%20Validator) — combines normalization, allowlists, port policy, and explicit scope decisions in a tested command-line project.

## Additional project

- [Pathfinder — Authorized Target Classifier](Pathfinder%20-%20Authorized%20Target%20Classifier) — classifies multiple targets with ordered loop processing while preserving authorization safeguards.
