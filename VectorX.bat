@echo off

rem Переход в каталог с проектом
cd /d "C:\Users\user\source\repos\VectorX"

rem Запуск проекта в Visual Studio
echo Opening the project in Visual Studio...
start /B EnglishAssistantPro.sln

rem Переход в каталог с back-end
cd /d "C:\Users\user\source\repos\VectorX\VectorXBack-end"

rem Запуск dotnet run
echo Executing dotnet run...
start /B dotnet run

rem Переход в каталог с front-end
cd /d "C:\Users\user\source\repos\EnglishAssistantPro\vector-x-frontend"

rem Запуск npm start
echo Executing npm start...
start npm start
