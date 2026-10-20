@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo 尚未检测到 Node.js。请先安装 Node.js 长期支持版，然后重新双击此文件。
  echo 下载地址：https://nodejs.org/
  pause
  exit /b 1
)
if not exist node_modules\ (
  echo 首次启动，正在安装项目依赖……
  call npm install
  if errorlevel 1 pause & exit /b 1
)
call npm run dev
