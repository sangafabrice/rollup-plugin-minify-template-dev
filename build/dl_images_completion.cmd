#!/usr/bin/env -S cmd /q /c

:loop
for /f "skip=4" %%s in ('bitsadmin /getstate %myjob%') do (
    set /p "=_"<nul
    timeout /t 1 > nul
    if not "%%s"=="TRANSFERRED" goto :loop
)
echo.
bitsadmin /complete %myjob% | find "Job"

:: Close pop-up console window when parent is npx caller
node --eval="p=process;p.exit(p.ppid)"
pwsh -Command exit (Get-Process -Id %errorlevel%).Parent.Id
taskkill /pid %errorlevel%