#!/usr/bin/env pwsh

[CmdletBinding()]
param ([switch] $watch)

Set-Location -Path demo/ &&
babel-node --config-file "$PSScriptRoot/.babelrc" $($watch ? "--watch":$null) rollup.config.cjs