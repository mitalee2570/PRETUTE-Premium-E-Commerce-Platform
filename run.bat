@echo off
title PRETUTE E-Commerce Platform Launcher
cls
echo ======================================================================
echo           PRETUTE Premium E-Commerce Platform
echo ======================================================================
echo.
echo   🚀 Starting Backend API Server (Port 5000)...
echo   🌐 Starting Frontend Web Server (Port 5173)...
echo.
echo   ------------------------------------------------------------------
echo   🛒 Storefront:  http://localhost:5173
echo   🔐 Admin Panel: http://localhost:5173/admin
echo   🔑 Admin PIN:   1234   (or Password: admin123)
echo   ------------------------------------------------------------------
echo.
echo   Press Ctrl+C anytime to stop the servers.
echo ======================================================================
echo.

npm run dev
pause
