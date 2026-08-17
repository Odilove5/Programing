# CLI Training Archive: Target-data normalizer foundation

Week 1, Day 6 · Integrated lab

## Technical lesson overview

This lesson introduces target-data normalizer foundation before asking you to write commands or code. First build a mental model of the vocabulary and data flow below. You will then see the notion in a realistic authorized-lab situation, explain it in your own words, complete small guided checks, and finally build a project from a blank editor.

## Learning objectives

- Explain target-data normalizer foundation in plain language
- Implement a small integrated lab example without copying
- Test normal, boundary, and failure behavior
- Connect the result to defensive validation and evidence quality

## Technical concept explanation

### Technical lesson

Begin by running Python interactively and then saving the same statements in a script. Python values have types such as int, float, str, bool, and NoneType; variables are names bound to those values. Arithmetic operators produce numeric results, while strings support indexing, slicing, concatenation, and formatted output. input() always returns text, so conversion belongs at the boundary. For a target normalizer, collect one line, strip surrounding whitespace, reject an empty value, and print a structured preview before writing anything.

### How to practise Target-data normalizer foundation

Integrate the week's components into the cumulative project. Define the user story, threat model, functional and safety requirements, then implement the smallest vertical slice. The increment is complete only when tests, redacted evidence, documentation, cleanup, and a retrospective are present.

### Build the security-tool component

Build target-data normalizer foundation as a small data pipeline: accept a local value, validate its shape, transform it, and print or save a structured result. Use modern Python 3 syntax, precise exceptions, and a fixture that cannot contact a network. The objective is independent coding fluency, not memorizing a recipe.

## CLI course content and completed exercises

### Lesson overview

Built a local target-data normalizer that treats authorization as a validation
decision. The program begins with a safe `stop` decision and changes to
`authorized` only after the hostname and port satisfy every rule.

### Concepts practiced

- Sets for explicit target allowlists
- Strings, integers, booleans, and `None`
- `.strip()` and `.lower()` for input normalization
- `if`, `elif`, and `else` for ordered validation
- `try` and `except ValueError` for safe integer conversion
- Dictionaries for structured result records
- f-strings for readable output
- Git staging, reviewing, ignoring, and committing

### Student project

The student wrote `student_target_normalizer.py`. It:

1. Normalizes a fictional local-lab hostname.
2. Rejects empty hostnames and hostnames containing spaces.
3. Converts port text to an integer and enforces ports 1 through 65535.
4. Rejects targets outside the explicit allowlist.
5. Produces a structured decision and reason.

### Automated validation

The test harness passed all seven cases:

- Authorized target
- Empty hostname
- Hostname with an internal space
- Nonnumeric port
- Port below the valid range
- Port above the valid range
- Target outside the allowlist

### Git packaging

The project was initialized as its own repository. The student implementation,
test harness, README, and `.gitignore` were staged and reviewed. The instructor
reference solution and Python cache were ignored. The clean project snapshot was
saved as commit `da3cf7e Add tested target-data normalizer`.

#### Commands used to package the project

Run these commands from the `day6-target-data-normalizer` project folder:

```powershell
# Create a new Git repository in the current project folder.
git init

# Show untracked files and files excluded by .gitignore.
git status --short --ignored

# Stage only the student project files for the next commit.
git add -- .gitignore README.md student_target_normalizer.py test_student_target_normalizer.py

# Summarize the files and line changes currently staged.
git diff --cached --stat

# Check staged files for whitespace problems before committing.
git diff --cached --check

# Confirm which files are staged, modified, or untracked.
git status --short

# Set the author identity only inside this training repository.
git config --local user.name "Odilon Nguemou"
git config --local user.email "odilon@local.invalid"

# Restage files after correcting the whitespace findings.
git add -- README.md student_target_normalizer.py

# Save the staged project snapshot in Git history.
git commit -m "Add tested target-data normalizer"

# Display the newest commit in compact form.
git log --oneline -1

# Confirm that no tracked changes remain after the commit.
git status --short
```

`git add` prepares selected changes in Git's staging area. `git diff --cached`
lets you review that staged snapshot. `git commit` permanently records the
reviewed snapshot in the repository history.

### Safety lesson

Validation is not the same as authorization. A target is permitted only when it
is nonempty, syntactically acceptable, uses a valid port, and appears in the
explicit training allowlist. The program performs no network activity.

## Student solution

```python
authorized_targets = {"lab-server.local", "training-api.local"}
target_name = "Training API"
raw_hostname = "   TRAINING-API.LOCAL   "
port_text = "8443"

normalized_hostname = raw_hostname.strip().lower()

decision = "stop"
reason = "validation has not completed"
port = None

#Empty hostname check

if not normalized_hostname:
    reason = "hostname is empty"

elif " " in normalized_hostname:
    reason = "hostname contains spaces"

else:
    try:
        port = int(port_text)
        if port < 1 or port > 65535:
            reason = "port must be between 1 and 65535"
        elif normalized_hostname not in authorized_targets:
            reason = "target is outside the authorized allowlist"
        else:
            decision = "authorized"
            reason = "target and port passed validation"
    except ValueError:
        reason = "port must be a whole number"

result = {
    "target_name": target_name,
    "original_hostname": raw_hostname,
    "normalized_hostname": normalized_hostname,
    "port": port,
    "decision": decision,
    "reason": reason,
}

print(f"Target: {result['target_name']}")
print(f"Original hostname: \"{result['original_hostname']}\"")
print(f"Normalized hostname: \"{result['normalized_hostname']}\"")
print(f"Port: {result['port']}")
print(f"Decision: {result['decision']}")
print(f"Reason: {result['reason']}")
```

## Student notes

Completed the target-data normalizer, automated failure tests, and Git project packaging.

## Completion record

- Lesson completed in the local study platform.
- CLI exercises and final student solution captured.
- Archive regenerated: 2026-08-12T14:29:49.867Z
