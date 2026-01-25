#!/usr/bin/env -S cmd /q /c

:loop
for /f "skip=4" %%s in ('bitsadmin /getstate %~1') do (
    set /p "=_"<nul
    timeout /t 1 > nul
    if not "%%s"=="TRANSFERRED" goto :loop
)
echo.
bitsadmin /complete %~1 | find "Job"

:: Close pop-up console window when parent is npx caller
pwsh -Command exit (Get-Process -Id (Get-Process -Id $PID).Parent.Id).Parent.Id
taskkill /pid %errorlevel%