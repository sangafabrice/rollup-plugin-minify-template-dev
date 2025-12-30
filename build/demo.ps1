#!/usr/bin/env pwsh

$d = 'demo'
Remove-Item $d/dist,$d/rollup.config.mjs -Recurse -ErrorAction Ignore
babel $d/rollup.config.js --out-file $d/rollup.config.mjs
Set-Location $d/
rollup --config