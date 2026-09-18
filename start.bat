@echo off
title K3SOMSTORE Platform - All-in-One Launcher
color 0b
echo ===============================================================================
echo                K3SOMSTORE E-COMMERCE PLATFORM (PRODUCTION READY)
echo ===============================================================================
echo.
echo  * Frontend:  http://localhost:3000
echo  * Backend:   http://localhost:5000
echo  * Mobile IP: http://192.168.100.17:3000
echo.
echo  Starting both Frontend and Backend concurrently...
echo  (Press Ctrl+C in this terminal window anytime to stop both servers)
echo.
npm run dev
pause
