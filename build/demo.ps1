#!/usr/bin/env pwsh

$d = 'demo'
$outconfig = "rollup.config.js"
$id = "watcher"
Set-Location $d/
Remove-Item dist -Recurse -ErrorAction Ignore
$watcher = & $PSScriptRoot/watcher $PWD
[Console]::OutputEncoding = [Text.UTF8Encoding]::UTF8
$job = Register-ObjectEvent $watcher Changed $id {
    if ($args[1].Name -ne $outconfig) { return }
    [Environment]::NewLine + "<-- Restart -->"
    (rollup --config 2>&1) -join "`n"
}
& $job.Module {
    & ([scriptblock]::Create($job.Command)) $watcher @{ Name = $outconfig }; ""
}
"The $outconfig watcher is ready."
while ($true) {
    Wait-Event $id -Timeout 5
    Receive-Job $job -ErrorAction SilentlyContinue
}