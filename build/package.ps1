#!/usr/bin/env pwsh

$package = "package.json"
$out = Get-Content src/$package | ConvertFrom-Json
$out.name = $out.name.Remove($out.name.Length - "src".Length - 1)
$out.PSObject.Properties.Remove("scripts")
$out | ConvertTo-Json | Out-File -Path lib/$package -Encoding utf8 -NoNewline