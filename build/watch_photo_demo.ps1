#!/usr/bin/env pwsh

param(
    [switch] ${no-server}
)

$noServerParam = ${no-server} ? "--configNoServer":$null

Set-Location "demo/"
rollup --config --watch --no-watch.clearScreen $noServerParam