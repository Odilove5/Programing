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
