#!/usr/bin/env pwsh

flow stop

$gpsargs = @{
    Name = "flow"
    Force = $true
    PassThru = $true
    ErrorAction = "Ignore"
}
while (@(Stop-Process @gpsargs).Length) {
    Start-Sleep -Seconds 2
}