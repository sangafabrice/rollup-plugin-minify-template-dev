#!/usr/bin/env pwsh

[CmdletBinding(DefaultParameterSetName="noserver")]
param(
    [Parameter(ParameterSetName="server")]
    [switch] $server,
    [Parameter(ParameterSetName="noserver")]
    [switch] ${no-server}
)

$noServerParam = (
    $PSCmdlet.ParameterSetName -eq "server" ?
        (-not $server):${no-server}
) ? "--configNoServer":$null

Set-Location "demo/"
rollup --config --watch --no-watch.clearScreen $noServerParam