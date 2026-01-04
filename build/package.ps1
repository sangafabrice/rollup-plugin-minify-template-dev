#!/usr/bin/env pwsh

$package = "package.json"
$watcher = & $PSScriptRoot/watcher (Resolve-Path src/)
$id = "watcher"
Register-ObjectEvent $watcher Changed -SupportEvent $id {
    if ($args[1].Name -ne $package) { return }
    $out = Get-Content src/$package | ConvertFrom-Json
    $out.name = $out.name.Remove($out.name.Length - "src".Length - 1)
    $out.PSObject.Properties.Remove("scripts")
    $out | ConvertTo-Json | Out-File lib/$package utf8 -NoNewline
    Write-Host "✔ emitted $package"
}
New-Event $id -EventArguments $watcher,@{ Name = $package } | Out-Null
"The $package watcher is ready."
Wait-Event