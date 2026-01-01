#!/usr/bin/env pwsh

Remove-Item -Path lib/*
Copy-Item -Path src/* -Destination lib/