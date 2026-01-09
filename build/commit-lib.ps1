#!/usr/bin/env pwsh

[CmdletBinding(PositionalBinding=$false)]
param(
    [Parameter(Mandatory, ValueFromRemainingArguments)]
    [ValidateNotNullOrEmpty()]
    [string] $message,
    [ValidateSet("lib", "src")]
    [ValidateCount(0,1)]
    [string[]] $only = @("lib", "src")
)

foreach ($dir in $only) {
    git -C $dir add --all
    git -C $dir commit --message $message
}