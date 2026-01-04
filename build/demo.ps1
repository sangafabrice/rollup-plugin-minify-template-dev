#!/usr/bin/env pwsh

$d = 'demo'
$outconfig = "rollup.config.js"
$id = "watcher"
Set-Location $d/
Remove-Item dist -Recurse -ErrorAction Ignore
$watcher = & $PSScriptRoot/watcher $PWD
[Console]::OutputEncoding = [Text.UTF8Encoding]::UTF8
$global:filechanged = $true
$null = Register-ObjectEvent $watcher Changed $id {
    if ($EventArgs.Name -eq $outconfig) {
        $global:filechanged = $true
    }
}
"The $outconfig watcher is ready."
while ($true) {
    if (!$filechanged) { continue  }
    Wait-Event -Timeout 5
    [Environment]::NewLine + "<-- Restart -->"
    (rollup --config 2>&1) -join "`n"
    $global:filechanged = $false
}