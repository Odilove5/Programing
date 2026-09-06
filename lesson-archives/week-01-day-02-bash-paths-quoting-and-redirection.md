# CLI Training Archive: Bash paths, quoting, and redirection

Week 1, Day 2 · Bash & PowerShell

## Technical lesson overview

This lesson introduces bash paths, quoting, and redirection before asking you to write commands or code. First build a mental model of the vocabulary and data flow below. You will then see the notion in a realistic authorized-lab situation, explain it in your own words, complete small guided checks, and finally build a project from a blank editor.

## Learning objectives

- Explain bash paths, quoting, and redirection in plain language
- Implement a small bash & powershell example without copying
- Test normal, boundary, and failure behavior
- Connect the result to defensive validation and evidence quality

## Technical concept explanation

### Technical lesson

Begin by running Python interactively and then saving the same statements in a script. Python values have types such as int, float, str, bool, and NoneType; variables are names bound to those values. Arithmetic operators produce numeric results, while strings support indexing, slicing, concatenation, and formatted output. input() always returns text, so conversion belongs at the boundary. For a target normalizer, collect one line, strip surrounding whitespace, reject an empty value, and print a structured preview before writing anything.

### How to practise Bash paths, quoting, and redirection

Solve one local filesystem or reporting task twice: once with Bash's text pipeline and once with PowerShell's object pipeline. Quote every path, inspect the command's help, capture its exit behavior, and explain where structured objects are safer than parsing display text.

## CLI course content and completed exercises

### Learning progression

The session introduced the shell as a workspace for repeatable local evidence tasks. `pwd` identified the current working directory, while `cd` changed the current directory. Paths containing spaces were quoted so Bash treated the complete path as one argument.

Variables were used to store a workspace folder and report path. The report path had to be assigned with `report="$folder/summary.txt"`; omitting the equals sign produced invalid assignment syntax. `mkdir -p -- "$folder"` created the directory safely: `-p` tolerated an existing directory, `--` ended option parsing, and quoting preserved spaces.

The lesson used `printf` for predictable formatted output. `>` created or replaced the report, while `>>` appended without erasing existing content. `cat` displayed the completed file. The newline escape was corrected from `/n` to `\n`.

### Exercises completed

1. Identify the current directory with `pwd`.
2. Move into `./security notes` with a quoted `cd` argument.
3. Create `folder` and `report` variables.
4. Create a directory whose name contains a space.
5. Write a report heading with `>`.
6. Append status and student information with `>>`.
7. Display the final report with `cat`.

### Errors debugged

- Added the missing equals sign to the `report` assignment.
- Quoted every variable expansion used as a path.
- Corrected the newline escape to `\n`.
- Distinguished overwriting with `>` from appending with `>>`.

### Observed result

```text
Security study report
Status: completed
```

The final script created a local report deterministically without contacting a network or interpreting a path as a command.

### Student exercise record

Navigation commands practiced:

```bash
pwd
cd "./security notes"
```

Workspace and report variables:

```bash
folder="./security notes"
report="$folder/summary.txt"
mkdir -p -- "$folder"
```

Writing, appending, and reading the report:

```bash
printf 'Security study report\n' > "$report"
status="completed"
printf 'Status: %s\n' "$status" >> "$report"
student="Odilon Nguemou"
printf 'Student: %s\n' "$student" >> "$report"
cat "$report"
```

```text
Security study report
Status: completed
Student: Odilon Nguemou
```

## Student solution

```shell
#!/usr/bin/env bash
set -u
folder="./security notes"
report="$folder/summary.txt"
mkdir -p -- "$folder"
printf 'Security study report\n' > "$report"
printf 'Status: completed\n' >> "$report"
cat "$report"
```

## Student notes

Completed Bash navigation, variables, quoting, directory creation, and output redirection.

## Completion record

- Lesson completed in the local study platform.
- CLI exercises and final student solution captured.
- Archive regenerated: 2026-08-12T14:29:49.718Z
