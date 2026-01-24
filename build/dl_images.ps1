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
Select-Object @{
    Name = "Source"
    Expression = { "https://i.imgur.com/$_" }
},@{
    Name = "Destination"
    Expression = { Join-Path $PWD $_ }
} |
Start-BitsTransfer