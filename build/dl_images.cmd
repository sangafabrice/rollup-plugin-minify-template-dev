#!/usr/bin/env -S cmd /q /c

setlocal
set imgpath=demo\w3c\img&
mkdir %imgpath% 2> nul
cd %imgpath% 2> nul && call :download
endlocal 
goto :eof

:download
for /f "skip=4 tokens=3" %%i in ('bitsadmin /create /download myjob') do set myjob=%%i&
set "myjob=%myjob:.=%"
for /f "usebackq" %%i in ("%~dp0\images.conf") do (
    bitsadmin /addfile %myjob% https://i.imgur.com/%%i.jpg "%cd%\%%i.jpg" | find "Added"
)
bitsadmin /resume %myjob% | find "Job"
:loop
for /f "skip=4" %%s in ('bitsadmin /getstate %myjob%') do (
    set /p "=_"<nul
    timeout /t 1 > nul
    if not "%%s"=="TRANSFERRED" goto :loop
)
echo.
bitsadmin /complete %myjob% | find "Job"
exit /b