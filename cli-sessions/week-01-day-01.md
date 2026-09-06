### Learning progression

The session began with a fictional, explicitly authorized practice target. A variable was introduced as a meaningful name bound to a value. The student created `target_name`, `ip_address`, `port`, and `is_authorized`, then identified their types as `str`, `str`, `int`, and `bool`.

The first report used comma-separated `print()` arguments. This exposed a formatting limitation: `print()` inserts spaces between arguments. The lesson then introduced f-strings as a readable way to place values inside a sentence and format an address as `ip:port`.

The port was next represented as the text `"8080"`. Converting it with `int()` made arithmetic possible. Replacing the numeric text with `"HTTP"` demonstrated `ValueError`. A focused `try`/`except ValueError` block was used to report malformed input without hiding unrelated errors.

### Exercises completed

1. Create and print a fictional target using string, integer, and Boolean variables.
2. Format the target, protocol, address, port, and authorization state with an f-string.
3. Predict and verify the types of four values.
4. Convert numeric port text and calculate the next port.
5. Predict the failure caused by converting non-numeric text.
6. Correct indentation and syntax in a `try`/`except` block.
7. Build the final authorized-target report.

### Errors debugged

- Replaced punctuation inside `print()` arguments with valid commas or f-string formatting.
- Corrected `/n` to the newline escape `\n`.
- Corrected `expect ValueError` to `except ValueError`.
- Corrected `f:` to the f-string prefix `f` immediately before a quote.
- Removed unexpected top-level indentation and used four spaces inside blocks.
- Added the converted port to the address output.

### Observed result

```text
Target: practice-server
Address: 192.0.2.50:8443
Authorized: True
```

The student explained that a non-numeric string cannot be converted to an integer and successfully produced a handled error path.

### Student exercise record

```python
target_name = "lab-server"
ip_address = "192.0.2.20"
port = 8080
is_authorized = True
protocol = "HTTP"

print(
    f"Target {target_name} uses {protocol} at "
    f"{ip_address}:{port}. Authorized: {is_authorized}"
)
```

Type prediction completed correctly:

```text
target_name -> str
ip_address -> str
port -> int
is_authorized -> bool
```

Conversion exercise:

```python
port_text = "8080"
port_number = int(port_text)
next_port = port_number + 1
print(next_port)
```

```text
8081
```

Handled failure exercise:

```python
port_text = "HTTPS"

try:
    port_number = int(port_text)
    print(f"Valid port: {port_number}")
except ValueError:
    print(f"Invalid port: {port_text} must be a whole number.")
```

```text
Invalid port: HTTPS must be a whole number.
```
