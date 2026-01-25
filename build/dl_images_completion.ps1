#!/usr/bin/env pwsh

$bitsJob = Get-BitsTransfer -JobId $args[0] -ErrorAction SilentlyContinue
while ($bitsJob.JobState -and $bitsJob.JobState -ne "Transferred") { }
Complete-BitsTransfer $bitsJob -ErrorAction SilentlyContinue