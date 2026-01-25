#!/usr/bin/env pwsh

$urls = @(); $paths = @()
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
ForEach-Object {
    $urls += "https://i.imgur.com/$_"
    $paths += Join-Path $PWD $_
} -End {
    Start-BitsTransfer $urls $paths -Asynchronous -OutVariable bitsJob
    $jobId = $bitsJob.JobId
    Start-Process pwsh "-Command complete-dl-img $jobId" -WindowStyle Hidden
}