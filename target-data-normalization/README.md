# Week 1 Target-Data Normalizer

A local-only training project that normalizes fictional target data, validates
hostname and port input, enforces an explicit allowlist, and prints a structured
decision record.

The program makes no network connection and performs no active security testing.

## Project objective

Given a target name, hostname, and port, the program must:

1. Remove surrounding whitespace and convert the hostname to lowercase.
2. Reject an empty hostname or one containing spaces.
3. Convert the port text to an integer and enforce the range 1 through 65535.
4. Permit only hostnames in the explicit local-lab allowlist.
5. Produce a clear decision and reason.

## Run the student program

```powershell
python student_target_normalizer.py
```

Expected baseline result:

```text
Target: Training API
Original hostname: "   TRAINING-API.LOCAL   "
Normalized hostname: training-api.local
Port: 8443
Decision: authorized
Reason: target and port passed validation
```

## Run the automated checks

```powershell
python test_student_target_normalizer.py
```

The test harness checks seven cases: valid input, empty hostname, hostname with
spaces, nonnumeric port, ports below and above the valid range, and a target
outside the allowlist.

## Safety boundaries

- Use fictional local-lab hostnames only.
- Keep an explicit allowlist.
- Default to `stop` until every validation succeeds.
- Do not add network requests or scan third-party targets.
```
