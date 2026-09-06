$ErrorActionPreference = "Stop"

$studentScript = Join-Path $PSScriptRoot "process_report.ps1"
$originalHash = (Get-FileHash -LiteralPath $studentScript -Algorithm SHA256).Hash
$temporaryDirectory = Join-Path ([System.IO.Path]::GetTempPath()) ("offsec-process-report-" + [guid]::NewGuid())

try {
    New-Item -ItemType Directory -Path $temporaryDirectory | Out-Null
    Copy-Item -LiteralPath $studentScript -Destination $temporaryDirectory

    Push-Location $temporaryDirectory
    try {
        $output = & powershell -NoProfile -ExecutionPolicy Bypass -File .\process_report.ps1 2>&1
        $studentExitCode = $LASTEXITCODE
    }
    finally {
        Pop-Location
    }
    if ($studentExitCode -ne 0) {
        throw "Student script exited with code $studentExitCode.`n$output"
    }

    $reportPath = Join-Path $temporaryDirectory "process-report.json"
    if (-not (Test-Path -LiteralPath $reportPath)) {
        throw "The JSON report was not created."
    }

    $report = Get-Content -LiteralPath $reportPath -Raw | ConvertFrom-Json
    $checks = [ordered]@{
        "process name is powershell" = $report.ProcessName -eq "powershell"
        "process ID is positive" = $report.Id -is [int] -and $report.Id -gt 0
        "working set is numeric and nonnegative" = $report.WorkingSetMB -is [ValueType] -and $report.WorkingSetMB -ge 0
        "timestamp is valid ISO 8601" = $null -ne ($report.CollectedAt -as [datetimeoffset])
        "save confirmation was printed" = [bool]($output -match "Report saved to: process-report.json")
        "restored process was printed" = [bool]($output -match "Restored process: powershell")
        "four Boolean checks passed" = @($output | Where-Object { $_ -eq $true }).Count -eq 4
    }

    foreach ($check in $checks.GetEnumerator()) {
        if (-not $check.Value) {
            throw "FAIL  $($check.Key)"
        }
        Write-Output "PASS  $($check.Key)"
    }

    $currentHash = (Get-FileHash -LiteralPath $studentScript -Algorithm SHA256).Hash
    if ($currentHash -ne $originalHash) {
        throw "The student script changed during testing."
    }

    Write-Output "`n7 checks passed. The student script was not modified."
}
finally {
    if (Test-Path -LiteralPath $temporaryDirectory) {
        Remove-Item -LiteralPath $temporaryDirectory -Recurse -Force
    }
}
