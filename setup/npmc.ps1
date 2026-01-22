$npmps1 = @(where.exe npm.ps1)[0]
if ([string]::IsNullOrEmpty($npmps1)) { return }
Set-PSBreakpoint -Script $npmps1 -Line 2 -Action {
    if (${Script:args}[0] -inotin @(
            "run",
            "start",
            "install",
            "test"
        )
    ) { return }
    $node = $Script:PSCommandPath -replace 'npm\.ps1$',"node.exe"
    & $node "$PSScriptRoot/npmc.js" 2>&1 | Out-Host
}
Write-Host ✔ PS BreakPoint Set