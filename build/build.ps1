#!/usr/bin/env pwsh

Remove-Item -Path lib/*
Copy-Item -Path src/* -Destination lib/

[Console]::OutputEncoding = [Text.UTF8Encoding]::UTF8
$null = Start-ThreadJob { transform }
$null = Start-ThreadJob { write-declaration }
$null = Start-ThreadJob { write-package }

Receive-Job (Get-Job) -Wait -ErrorAction SilentlyContinue