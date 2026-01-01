#!/usr/bin/env pwsh

using namespace System.IO

$watcher = [FileSystemWatcher] @{
    Path = $args[0]
    NotifyFilter = [NotifyFilters]::LastWrite -bor [NotifyFilters]::FileName
}
$watcher.EnableRaisingEvents = $true

return $watcher