@echo off

:loop
for /f "skip=4" %%s in ('bitsadmin /getstate %myjob%') do (
    set /p "=_"<nul
    timeout /t 1 > nul
    if not "%%s"=="TRANSFERRED" goto :loop
)
echo.
bitsadmin /complete %myjob% | find "Job"

:: Close pop-up console window when parent is npx caller
exit