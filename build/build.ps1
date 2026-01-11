#!/usr/bin/env pwsh

Remove-Item -Path lib/*
Copy-Item -Path src/* -Destination lib/

[Console]::OutputEncoding = [Text.UTF8Encoding]::UTF8
@(
    "transform"
    "write_declaration"
    "write_package"
) | ForEach-Object -Parallel {
    node "build/$_.js" 
}