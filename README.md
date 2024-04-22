1. Установите Node.js, Microsoft SQL Server, SSMS и dotnet v7.0;

2. Выполните import database файла \VectorXBack-end\Data\VectorX.bacpac на свой SQL Server.

3. В терминале адайте переменную среды IP_ADDRESS, содержащую Server domain, с помощью setx IP_ADDRESS [domain], которая используется в launchSettings.json для конфигурации web-приложения. В целях локального развёртывания достаточно указать IP-address Вашего устройства, подключённого к сети (Команда ipconfig в терминале Windows; IPv4) или 'localhost';

4. Запустите backend. Обратите внимание на используемый port;

5. Создайте .env файл в корне проекта vector-x-frontend, и поместите в него следующее содержимое: REACT_APP_API_URL = "http://[domain]:[port]";

6. Выполните команду npm i в корне проекта vector-x-frontend, чтобы установить необходимые зависимости в React Project.

7. Запустите frontend.
