#!/usr/bin/env pwsh

Remove-Item -Path lib/*
Copy-Item -Path src/* -Destination lib/

$null = transform &
$null = Start-Job {
    [Console]::OutputEncoding = [Text.UTF8Encoding]::UTF8
    write-declaration
}
$null = Start-Job {
    [Console]::OutputEncoding = [Text.UTF8Encoding]::UTF8
    write-package
}

Receive-Job -Job (Get-Job) -Wait -ErrorAction SilentlyContinue