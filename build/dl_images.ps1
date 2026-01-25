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
ForEach-Object { "$_.jpg" } -PipelineVariable jpgname |
ForEach-Object {
    Start-ThreadJob {
        $jpg = $Using:jpgname
        $curlargs = @{
            Uri = "https://i.imgur.com/$jpg"
            OutFile = Join-Path $PWD $jpg
        }
        Invoke-WebRequest @curlargs
    }
} -End {
    Wait-Job -Job (Get-Job)
}