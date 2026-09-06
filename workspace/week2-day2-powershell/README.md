# Local Process Report

A PowerShell programming project demonstrating cmdlets, objects, pipelines,
calculated properties, JSON serialization, file writing, deserialization, and
programmatic validation.

The script reads only the current PowerShell process and writes a local JSON
report. It does not modify or stop any process.

## Run the project

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\process_report.ps1
```

## Run the automated tests

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\test_process_report.ps1
```

The generated `process-report.json` is excluded from Git.
