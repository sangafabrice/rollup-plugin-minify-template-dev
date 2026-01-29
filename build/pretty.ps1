#!/usr/bin/env pwsh

(prettier . --write) -replace "^`e\[90m(.+)`e.+$",'$1' |
ForEach-Object -Parallel {
    $path = ($_.Trim() -split " ")[0]
    $content = (Get-Content -Path $path -Raw).Trim()
    Set-Content -Path $path -Value $content -NoNewline
}