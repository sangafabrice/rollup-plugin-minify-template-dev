#!/usr/bin/env pwsh

$root = "demo/w3c"
Set-Location $root && $(
    $devtoolsparent = ".well-known/appspecific"
    New-Item $devtoolsparent -ErrorAction SilentlyContinue
    $configfile = Join-Path $devtoolsparent com.chrome.devtools.json
    @{
        workspace = @{
            root = (Resolve-Path .) -replace "\\","/"
            uuid = "$(New-Guid)"
        }
    } | ConvertTo-Json | Out-File $configfile
)
