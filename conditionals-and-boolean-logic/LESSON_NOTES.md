# CLI Training Archive: Conditionals, Boolean logic, and importing modules

Week 2, Day 1 · Python

## Technical lesson overview

This lesson introduces conditionals, boolean logic, and importing modules before asking you to write commands or code. First build a mental model of the vocabulary and data flow below. You will then see the notion in a realistic authorized-lab situation, explain it in your own words, complete small guided checks, and finally build a project from a blank editor.

## Learning objectives

- Explain conditionals, boolean logic, and importing modules in plain language
- Implement a small python example without copying
- Test normal, boundary, and failure behavior
- Connect the result to defensive validation and evidence quality

## Technical concept explanation

### Technical lesson

Conditionals select behavior using expressions that become True or False. Use if, elif, and else when branches are mutually exclusive, combine predicates with and, or, and not, and prefer direct membership tests over deeply nested comparisons. Imports make functions and constants from another module available; importing does not mean copying its source. This week, use ipaddress from the standard library to parse local target text and permit it only when it belongs to the declared lab network.

### How to practise Conditionals, Boolean logic, and importing modules

Work in the Python interpreter first, then save a module. Predict the type and value of each expression before running it. Finish by converting the example into a function with explicit inputs and a return value, because reusable functions become the building blocks for later security and agent tools.

### Build the security-tool component

Build conditionals, boolean logic, and importing modules as a small data pipeline: accept a local value, validate its shape, transform it, and print or save a structured result. Use modern Python 3 syntax, precise exceptions, and a fixture that cannot contact a network. The objective is independent coding fluency, not memorizing a recipe.

## CLI course content and completed exercises

### Technical lesson overview

This lesson introduced Python conditional control flow, Boolean expressions,
comparison and membership operators, short-circuit evaluation, imports, and
exception-aware decision logic. Explanations followed the Python tutorial and
Python standard-library documentation.

### 1. Boolean values

A Boolean represents one of two logical states:

```python
True
False
```

Notice the capital letters. `true` and `false` are not Python Boolean values.

A Boolean can be stored in a variable:

```python
is_active = True
has_permission = False
```

A comparison also produces a Boolean:

```python
port = 443

print(port == 443)  # True
print(port > 1024)  # False
```

### 2. Comparison operators

Python provides these comparison operators:

| Operator | Meaning |
| --- | --- |
| `==` | Equal to |
| `!=` | Not equal to |
| `<` | Less than |
| `<=` | Less than or equal to |
| `>` | Greater than |
| `>=` | Greater than or equal to |
| `in` | Contained in a collection |
| `not in` | Not contained in a collection |

`=` and `==` have different purposes:

```python
port = 443       # Assign 443 to port
port == 443      # Ask whether port equals 443
```

### 3. Conditional statements

A conditional lets the program choose which block to execute.

```python
port = 443

if port == 443:
    print("HTTPS port selected")
else:
    print("A different port was selected")
```

Important syntax rules:

- The condition follows `if`.
- The line ends with a colon.
- The controlled code is indented.
- `else` runs only when the `if` condition is false.

Use `elif` when there are several mutually exclusive possibilities:

```python
port = 443

if port == 80:
    protocol = "HTTP"
elif port == 443:
    protocol = "HTTPS"
else:
    protocol = "unknown"
```

Python evaluates these conditions from top to bottom and executes the first
matching branch.

### 4. Boolean operators

Boolean operators combine or reverse conditions.

#### `and`

Both conditions must be true:

```python
is_authorized = True
port = 443

if is_authorized and port == 443:
    print("Both conditions passed")
```

#### `or`

At least one condition must be true:

```python
if port == 80 or port == 443:
    print("Common web port")
```

#### `not`

Reverses a Boolean result:

```python
if not is_authorized:
    print("Stop")
```

### 5. Truthy and falsy values

A condition does not always need an explicit comparison. Python treats certain
values as false, including:

```python
False
None
0
""
[]
{}
set()
```

Most nonempty and nonzero values are treated as true.

```python
hostname = ""

if hostname:
    print("A hostname was provided")
else:
    print("The hostname is empty")
```

This is why you previously wrote:

```python
if not normalized_hostname:
    reason = "hostname is empty"
```

### 6. Importing modules

A module is a Python file containing reusable definitions such as functions,
classes, and constants.

The `import` statement makes a module available:

```python
import ipaddress
```

You then access members using the module name:

```python
address = ipaddress.ip_address("192.0.2.20")
print(address)
```

You can also import a particular definition:

```python
from ipaddress import ip_address

address = ip_address("192.0.2.20")
```

For beginners, importing the complete module is often clearer because
`ipaddress.ip_address` shows where the function came from.

### Programming concepts learned

- `True` and `False` Boolean values
- Comparison operators such as `==`
- `if`, `elif`, and `else` branch ordering
- `and`, `or`, and `not`
- Truthy and falsy values
- Membership tests using `in` and `not in`
- Short-circuit evaluation from left to right
- `import ipaddress` and qualified function access
- `try` and `except ValueError`
- The `try` statement's `else` block
- Safe defaults using `None`
- Conditional expressions
- f-string output

### Guided exercises completed

The student predicted conditional branches, explained Boolean results, and
wrote programs that classified IPv4 and IPv6 address objects. Corrections
included a missing colon, the misspelled `version` attribute, an undefined
output variable, exact output labels, and consistent decision values.

### Final project

The student built `ipv6_check.py`, an IP address decision program. It imports
Python's `ipaddress` module, converts address text, rejects invalid input,
checks Boolean authorization and active-state flags, checks allowed IP versions,
and emits a structured four-line result.

### Automated tests

`test_ip_address_decision.py` passed all six cases:

- Valid IPv4
- Valid IPv6
- Missing authorization
- Inactive address
- Disallowed IP version
- Invalid IP text

The harness verified that the student source file was unchanged during testing.

### Git packaging commands

```powershell
# Create an isolated repository for this project.
git init

# Run the automated tests before staging.
python test_ip_address_decision.py

# Stage only the student program, tests, documentation, and ignore rules.
git add -- .gitignore README.md ipv6_check.py test_ip_address_decision.py

# Review the size of the staged snapshot.
git diff --cached --stat

# Check staged files for whitespace errors.
git diff --cached --check

# Inspect tracked, untracked, staged, and ignored files.
git status --short --ignored

# Restage the student file after its whitespace cleanup.
git add -- ipv6_check.py

# Set a repository-local training identity.
git config --local user.name "Odilon Nguemou"
git config --local user.email "odilon@local.invalid"

# Save the reviewed project snapshot.
git commit -m "Add tested IP address decision program"

# Display the latest commit in compact form.
git log --oneline -1

# Confirm that the working tree is clean.
git status --short
```

The completed snapshot is commit
`34b3f1a Add tested IP address decision program`.

### Official documentation

- Python control flow: https://docs.python.org/3/tutorial/controlflow.html
- Python errors and exceptions: https://docs.python.org/3/tutorial/errors.html
- `ipaddress` module: https://docs.python.org/3/library/ipaddress.html

## Student solution

```python
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
```

## Student notes

Completed conditionals, Boolean logic, imports, exception-aware decisions, automated tests, and Git packaging.

## Completion record

- Lesson completed in the local study platform.
- CLI exercises and final student solution captured.
- Archive regenerated: 2026-08-12T14:29:49.898Z
