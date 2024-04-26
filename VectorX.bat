@echo off

rem Переход в каталог с back-end
cd /d "VectorXBackend"

rem Запуск dotnet run
echo Executing dotnet run...
start /B dotnet-run.bat

rem Переход в каталог с front-end
cd /d "C:\Users\user\source\repos\VectorX\vector-x-frontend"

rem Запуск npm start
echo Executing npm start...
start /B npm-start.bat

rem Переход в корневую директорию проекта
cd /d ../
rem Запуск проекта в Visual Studio Code. Для запуска в VS команда "start /B VectorX.sln"
code .
