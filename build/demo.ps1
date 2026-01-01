#!/usr/bin/env pwsh

$d = 'demo'
$outconfig = "rollup.config.mjs"
$id = "watcher"
Set-Location $d/
Remove-Item dist,$outconfig -Recurse -ErrorAction Ignore
$watcher = & $PSScriptRoot/watcher $PWD
[Console]::OutputEncoding = [Text.UTF8Encoding]::UTF8
Register-ObjectEvent -InputObject $watcher -EventName Changed -SourceIdentifier $id -Action {
    if ($args[1].Name -ne $outconfig) { return }
    Write-Host ([Environment]::NewLine + "<-- Restart -->") -ForegroundColor DarkMagenta
    (rollup --config 2>&1) -join "`n" | Out-Host
} | Out-Null
Push-Location ..
[void] (babel $d/rollup.config.js --out-dir $d --out-file-extension .mjs --watch &)
Pop-Location
"The $outconfig watcher is ready."
Wait-Event -SourceIdentifier $id