$npmps1 = @(where.exe npm.ps1)[0]
if ([string]::IsNullOrEmpty($npmps1)) { return }
$job = Start-ThreadJob {
    $root = $Using:PSScriptRoot
    curl --config "$root/jsmin.conf" --output "$root/jsmin.exe"
}
function Global:Find-PackageJson ($path) {
    if (Test-Path ($packagejson = Join-Path $path package.json))
        { return $packagejson }
    if ($null -ne ($parent = (Get-Item $path).Directory))
        { Find-PackageJson $parent }
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
    $scriptsObject = Get-Content $scriptsjson -Raw |
        & "$PSScriptRoot/jsmin.exe" |
        Out-String |
        ConvertFrom-Json
    $packageObject = Get-Content $packagejson -Raw |
        ConvertFrom-Json
    $packageObject.scripts = $scriptsObject
    $packageObject | ConvertTo-Json | Out-File $packagejson
}
Receive-Job $job -Wait -AutoRemoveJob
Write-Host ✔ PS BreakPoint Set