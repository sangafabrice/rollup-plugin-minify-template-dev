#!/usr/bin/env pwsh

Remove-Item -Path lib/*
Copy-Item -Path src/* -Destination lib/

[Console]::OutputEncoding = [Text.UTF8Encoding]::UTF8
@(
    { transform }
    { write-declaration }
    { write-package }
) | ForEach-Object -Process {
    Start-ThreadJob $_
} | Out-Null

Receive-Job (Get-Job) -Wait -ErrorAction SilentlyContinue