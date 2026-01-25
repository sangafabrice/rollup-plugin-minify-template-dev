#!/usr/bin/env pwsh

$imgpath = "demo/w3c/img"
New-Item $imgpath -ErrorAction SilentlyContinue
Set-Location $imgpath &&
@(
    "fBmIASF"
    "3zxD6rz"
    "nKBgeLOr"
    "yVjJZ1Yr"
) | 
ForEach-Object { "$_.jpg" } |
ForEach-Object -Begin {
    $guid = (
            bitsadmin /create /download myjob | 
            Select-Object -Last 1
        ) -replace "^.+\{(.+)\}\.",'$1'
    $bitsJob = Get-BitsTransfer -JobId $guid
} -Process {
    Add-BitsFile $bitsJob "https://i.imgur.com/$_" (Join-Path $PWD $_)
} -End {
    Set-BitsTransfer $bitsJob -Priority High
    Resume-BitsTransfer $bitsJob -Asynchronous
}