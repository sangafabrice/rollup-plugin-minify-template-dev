#!/usr/bin/env -S cmd /q /c

setlocal EnableDelayedExpansion
set imgpath=demo\w3c\img&
mkdir %imgpath% 2> nul
cd %imgpath% 2> nul && call :download
endlocal 
goto :eof

:download
set files=&
for /f "usebackq" %%i in ("%~dp0\images.conf") do (
    set files=!files! https://i.imgur.com/%%i.jpg "%cd%\%%i.jpg"& @rem
)
bitsadmin /transfer myjob %files%
exit /b