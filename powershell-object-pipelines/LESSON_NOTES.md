# CLI Training Archive: PowerShell cmdlets and object pipelines

Week 2, Day 2 · Bash & PowerShell

## Technical lesson overview

This lesson introduces PowerShell cmdlets and the object pipeline. Unlike a
traditional text pipeline, PowerShell passes .NET objects between commands.
Each object has a type, properties that store data, and methods that perform
operations. The lesson covers cmdlet naming, command discovery, help, object
inspection, property selection, filtering, variables, arrays, and structured
output using Microsoft PowerShell documentation.

## Learning objectives

By the end of this lesson, the student will be able to:

- Recognize PowerShell's `Verb-Noun` command naming convention.
- Discover commands using `Get-Command`.
- Read command help using `Get-Help`.
- Store command results in variables.
- Inspect an object's type, properties, and methods using `Get-Member`.
- Access object properties with dot notation.
- Pass objects through the pipeline.
- Select properties using `Select-Object`.
- Filter objects using `Where-Object`.
- Build a small local process-reporting script.

## Cmdlet explanation

A cmdlet is a PowerShell command designed to perform a focused operation.
Cmdlet names normally follow the `Verb-Noun` convention:

```powershell
Get-Process
Get-ChildItem
Get-Date
Select-Object
Where-Object
```

The verb describes the operation, while the noun identifies the kind of object
being processed. PowerShell uses approved verbs so related commands are easier
to discover.

`Get-Command` finds available commands:

```powershell
Get-Command Get-Process
Get-Command Get-*Process*
```

`Get-Help` explains a command's syntax and usage:

```powershell
Get-Help Get-Process
Get-Help Get-Process -Examples
Get-Help Get-Process -Full
```

`Get-Process` returns process objects. The displayed table is only a formatted
view of properties such as `ProcessName`, `Id`, `CPU`, and `WorkingSet`; it is
not the underlying object itself.

The pipeline operator `|` passes objects from left to right:

```powershell
Get-Process | Select-Object -First 1 | Get-Member
```

This command obtains process objects, selects the first one, and sends that
object to `Get-Member`, which reports its type, properties, and methods.

### Guided exercises completed

#### Process selection

```powershell
Get-Process | Select-Object -First 1
```

The student observed `AggregatorHost` with process ID `9436`. The formatted
table displayed properties including handles, memory, CPU, ID, session ID, and
process name.

#### Object inspection

```powershell
Get-Process | Select-Object -First 1 | Get-Member
```

Observed object information:

```text
TypeName: System.Diagnostics.Process
BasePriority       Property  int BasePriority {get;}
BeginErrorReadLine Method    void BeginErrorReadLine()
```

A property stores information about an object. A method represents an operation
associated with the object.

#### Property selection and collections

```powershell
Get-Process | Select-Object -First 3 | Select-Object ProcessName, Id
$processes = Get-Process | Select-Object -First 3
$processes.Count
$processes[0].ProcessName
```

The student observed three objects and retrieved `AggregatorHost` from index
`0`, demonstrating variables, collections, zero-based indexing, and dot
notation.

#### Filtering objects

```powershell
Get-Process |
    Where-Object { $_.Id -eq 9436 } |
    Select-Object ProcessName, Id

Get-Process |
    Where-Object { $_.ProcessName -like "A*" } |
    Select-Object -First 5 ProcessName, Id
```

The ID filter returned `AggregatorHost`. The wildcard filter returned five
process names beginning with `A`. `$_` represented each current pipeline
object; `-eq` tested equality and `-like` applied a wildcard pattern.

#### Calculated properties

```powershell
Get-Process -Id $PID |
    Select-Object ProcessName, Id,
        @{Name = "WorkingSetMB"; Expression = {
            [math]::Round($_.WorkingSet64 / 1MB, 2)
        }}
```

Observed result:

```text
ProcessName    Id WorkingSetMB
-----------    -- ------------
powershell  12860        99.08
```

The calculation read bytes from `WorkingSet64`, divided by PowerShell's `1MB`
numeric constant, and called the static .NET `Math.Round` method.

After storing the result in `$report`, `Get-Member` showed:

```text
TypeName: Selected.System.Diagnostics.Process
WorkingSetMB NoteProperty System.Double WorkingSetMB=98.57
```

The value changed slightly because process memory is dynamic.

#### JSON serialization and restoration

```powershell
$json = $report | ConvertTo-Json
$report.GetType().FullName
$json.GetType().FullName
$restored = $json | ConvertFrom-Json
$restored.GetType().FullName
$restored.ProcessName
$restored.WorkingSetMB
```

Observed types and restored values:

```text
System.Management.Automation.PSCustomObject
System.String
System.Management.Automation.PSCustomObject
powershell
98.57
```

Serialization converted a structured object into JSON text. Deserialization
created a new `PSCustomObject` containing the saved properties.

### Final project

The student built `process_report.ps1`. It retrieves the current PowerShell
process, creates `ProcessName`, `Id`, `WorkingSetMB`, and `CollectedAt`
properties, displays the report, saves it as UTF-8 JSON, reads it with
`Get-Content -Raw`, restores it with `ConvertFrom-Json`, and prints restored
properties.

Observed console output:

```text
Report saved to: process-report.json
Restored process: powershell
Restored memory MB: 79.35
```

Observed JSON:

```json
{
  "ProcessName": "powershell",
  "Id": 19040,
  "WorkingSetMB": 79.35,
  "CollectedAt": "2026-08-12T13:10:01.8703295-04:00"
}
```

Four direct property checks returned `True`: process name, positive process ID,
nonnegative memory, and a present timestamp.

### Automated tests

`test_process_report.ps1` runs the student script in a temporary directory and
passed seven checks:

- Process name is `powershell`
- Process ID is positive
- Working-set value is numeric and nonnegative
- Timestamp is valid ISO 8601
- Save confirmation was printed
- Restored process was printed
- All four Boolean checks passed

The harness also verified that the student script was not modified and removed
its temporary test directory.

### Git packaging commands

```powershell
# Create the isolated project repository.
git init

# Inspect untracked and ignored files.
git -c safe.directory=C:/Users/Tester/security-study-coach/workspace/week2-day2-powershell status --short --ignored

# Stage only source, tests, documentation, and ignore rules.
git -c safe.directory=C:/Users/Tester/security-study-coach/workspace/week2-day2-powershell add -- .gitignore README.md process_report.ps1 test_process_report.ps1

# Review and validate the staged snapshot.
git -c safe.directory=C:/Users/Tester/security-study-coach/workspace/week2-day2-powershell diff --cached --stat
git -c safe.directory=C:/Users/Tester/security-study-coach/workspace/week2-day2-powershell diff --cached --check

# Run the automated tests before committing.
powershell -NoProfile -ExecutionPolicy Bypass -File .\test_process_report.ps1

# Configure an identity only for this repository.
git -c safe.directory=C:/Users/Tester/security-study-coach/workspace/week2-day2-powershell config --local user.name "Odilon Nguemou"
git -c safe.directory=C:/Users/Tester/security-study-coach/workspace/week2-day2-powershell config --local user.email "odilon@local.invalid"

# Save and inspect the project snapshot.
git -c safe.directory=C:/Users/Tester/security-study-coach/workspace/week2-day2-powershell commit -m "Add tested PowerShell process report"
git -c safe.directory=C:/Users/Tester/security-study-coach/workspace/week2-day2-powershell log --oneline -1
git -c safe.directory=C:/Users/Tester/security-study-coach/workspace/week2-day2-powershell status --short --ignored
```

The final snapshot is commit
`b5c96ce Add tested PowerShell process report`. The generated
`process-report.json` remains ignored.

### Official documentation

- PowerShell documentation: https://learn.microsoft.com/powershell/
- About pipelines: https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_pipelines
- Get-Command: https://learn.microsoft.com/powershell/module/microsoft.powershell.core/get-command
- Get-Help: https://learn.microsoft.com/powershell/module/microsoft.powershell.core/get-help
- Get-Member: https://learn.microsoft.com/powershell/module/microsoft.powershell.utility/get-member
- Select-Object: https://learn.microsoft.com/powershell/module/microsoft.powershell.utility/select-object
- Where-Object: https://learn.microsoft.com/powershell/module/microsoft.powershell.core/where-object
- ConvertTo-Json: https://learn.microsoft.com/powershell/module/microsoft.powershell.utility/convertto-json
- ConvertFrom-Json: https://learn.microsoft.com/powershell/module/microsoft.powershell.utility/convertfrom-json
- Set-Content: https://learn.microsoft.com/powershell/module/microsoft.powershell.management/set-content
- Get-Content: https://learn.microsoft.com/powershell/module/microsoft.powershell.management/get-content

## CLI course content and completed exercises

No guided CLI exercises have been recorded yet.

## Student solution

```shell
$reportPath = "process-report.json"
$currentProcess = Get-Process -Id $PID

$report = $currentProcess |
    Select-Object ProcessName, Id,
        @{Name = "WorkingSetMB"; Expression = {[math]::Round($_.WorkingSet64 / 1MB, 2)
        }},
        @{Name = "CollectedAt"; Expression = {(Get-Date).ToString("o")
        }}

$report | Format-Table

$json = $report | ConvertTo-Json
Set-Content -LiteralPath $reportPath -Value $json -Encoding UTF8

Write-Output "Report saved to: $reportPath"

$savedJson = Get-Content -LiteralPath $reportPath -Raw

$restored = $savedJson | ConvertFrom-Json

Write-Output "Restored process: $($restored.ProcessName)"
Write-Output "Restored memory MB: $($restored.WorkingSetMB)"

$testJson = Get-Content -LiteralPath .\process-report.json -Raw
$testReport = $testJson | ConvertFrom-Json

$testReport.ProcessName -eq "powershell"
$testReport.Id -gt 0
$testReport.WorkingSetMB -ge 0
$null -ne $testReport.CollectedAt
```

## Student notes

Completed PowerShell cmdlets, object pipelines, filtering, calculated properties, JSON persistence, seven automated checks, and Git packaging.

## Completion record

- Lesson completed in the local study platform.
- CLI exercises and final student solution captured.
- Archive regenerated: 2026-08-12T17:18:44.787Z
