$npmps1 = @(where.exe npm.ps1)[0]
if ([string]::IsNullOrEmpty($npmps1)) { return }
$job = Start-ThreadJob {
    $root = $Using:PSScriptRoot
    $guid = (
            bitsadmin /create /download myjob | 
            Select-Object -Last 1
        ) -replace "^.+(\{.+\})\.",'$1'
    $source = "https://raw.github.com/douglascrockford/JSMin/master/jsmin.exe"
    bitsadmin /transfer $guid $source "$root\jsmin.exe" | find "Transfer complete."
    bitsadmin /complete $guid | find "Job completed."
}
function Global:Find-PackageJson ($path) {
    if (Test-Path ($packagejson = Join-Path $path package.json))
        { return $packagejson }
    if ($null -ne ($parent = (Get-Item $path).Directory))
        { Find-PackageJson $parent }
}
function Global:< ($file, $app) {
    Get-Content $scriptsjson -Raw | & $app | Out-String
}
Set-PSBreakpoint -Script $npmps1 -Line 2 -Action {
    if (${Script:args}[0] -inotin @(
            "run",
            "start",
            "install",
            "test"
        )
    ) { return }
    $packagejson = Find-PackageJson $PWD
    $scriptsjson = Join-Path (Get-Item $packagejson).Directory package.scripts.json
    if (-not (Test-Path $scriptsjson)) { return }
    $scriptsObject = < $scriptsjson "$PSScriptRoot/jsmin.exe" |
        ConvertFrom-Json
    $packageObject = Get-Content $packagejson -Raw |
        ConvertFrom-Json
    $packageObject.scripts = $scriptsObject
    $packageObject | ConvertTo-Json | Out-File $packagejson -NoNewline
}
Receive-Job $job -Wait -AutoRemoveJob
Write-Host ✔ PS BreakPoint Set