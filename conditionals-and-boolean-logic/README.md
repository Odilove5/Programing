# IP Address Decision Program

A Week 2 Python programming project demonstrating Boolean logic, conditional
control flow, membership tests, standard-library imports, exception handling,
conditional expressions, and formatted output.

The program classifies local input only. It makes no network connections.

## Run the program

```powershell
python ipv6_check.py
```

Expected baseline output:

```text
Address: 192.0.2.20
Version: 4
Decision: accepted
Reason: all conditions passed
```

## Run the automated tests

```powershell
python test_ip_address_decision.py
```

The harness checks valid IPv4 and IPv6 addresses, missing authorization,
inactive status, a disallowed IP version, and invalid IP text. It runs input
variations in memory and confirms that the student program is not modified.
