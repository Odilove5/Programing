# CLI Training Archive: Values and variables: data types, strings, input, and output

Week 1, Day 1 · Python

## Technical lesson overview

This lesson introduces run python: values, data types, strings, input, and output before asking you to write commands or code. First build a mental model of the vocabulary and data flow below. You will then see the notion in a realistic authorized-lab situation, explain it in your own words, complete small guided checks, and finally build a project from a blank editor.

## Learning objectives

- Explain how a Python variable gives a value a meaningful name
- Create and identify string, integer, and Boolean values
- Display mixed values with print and format a readable report with f-strings
- Inspect types and convert numeric text into an integer
- Recognize a ValueError and handle invalid input with try and except
- Build and debug a small report for an explicitly authorized lab target

## Technical concept explanation

### A realistic authorized-target record

A security automation tool needs clear names for the facts it handles. In this example, target_name and ip_address hold text, port holds a whole number, and is_authorized records a yes-or-no safety decision. The equals sign assigns the value on its right to the name on its left. Quotation marks create strings; 8080 without quotation marks is an integer; True is a Boolean keyword. These types are not decoration: they determine which operations Python can perform and help prevent a tool from confusing a label with a number.

### Readable output with print and f-strings

The print function displays values. Comma-separated arguments work, but print inserts spaces between them. An f-string gives precise control: prefix the quoted text with f and place a variable inside braces, such as f"Target {target_name}". Adjacent f-strings inside parentheses form one string, which keeps a long report readable. The escape sequence \n starts a new output line. Every opening quote, parenthesis, and brace must have a matching closing character.

### Types, conversion, and failure

The type function reveals a value's category. The text "8080" is a str even though it contains digits, so arithmetic requires conversion with int(port_text). Valid numeric text becomes an integer; non-numeric text such as "HTTPS" raises ValueError. This is expected input behavior, not evidence that Python is broken. A reliable tool anticipates malformed operator input and reports exactly what needs correction.

### Recover safely with try and except

Place the conversion inside a try block and catch ValueError with a matching except block. If conversion succeeds, Python prints the report and skips the handler. If it fails, Python jumps to except ValueError and displays a useful message instead of terminating unexpectedly. The try and except keywords align at the far left, while the statements inside each block use four spaces. Catching the specific expected exception keeps unrelated programming defects visible.

## CLI course content and completed exercises

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

## Student solution

```python
# No editor code was captured for this archive.
```

## Student notes

Variables give a value a useful name.

## Completion record

- Lesson completed in the local study platform.
- CLI exercises and final student solution captured.
- Archive regenerated: 2026-08-12T14:29:49.629Z
