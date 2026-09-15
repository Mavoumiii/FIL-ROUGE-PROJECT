@echo off
setlocal enabledelayedexpansion

cd /d "%~dp0"

echo Installing dependencies...
call npm install

echo Running remove-bg.mjs...
call node remove-bg.mjs

echo Done!
pause
