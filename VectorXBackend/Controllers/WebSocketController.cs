using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.WebSockets;
using System.Text.Json;
using System.Text;
using System.Threading;
using VectorXBackend.Interfaces.Services;
using VectorXBackend.Services;
using VectorXBackend.DTOs.SharedDTOs;
using VectorXBackend.Interfaces.Repositories.AccountService;

namespace VectorXBackend.Controllers
{
    [Route("ws")]
    [ApiController]
    public class WebSocketController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;
        public WebSocketController(IUserRepository userRepository, IRoleRepository roleRepository)
        {
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            _roleRepository = roleRepository ?? throw new ArgumentNullException(nameof(_roleRepository));
        }
        //Метод для тестирования возможности обновить данные пользователя по соскету (при определённом событии) в режиме реального времени
        [Route("updateUserData")]
        public async Task UpdateUserData()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                var startTime = DateTime.Now;
                var interval = TimeSpan.FromSeconds(1); // Интервал для обновления времени
                var buffer = new byte[1024 * 4];
                var receiveResult = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

                while (webSocket.State == WebSocketState.Open)
                {
                    var userId = int.Parse(Encoding.UTF8.GetString(buffer, 0, receiveResult.Count));

                    var existingUser = await _userRepository.GetUserById(userId);
                    var role = await _roleRepository.GetRoleById(existingUser.RoleId);
                    // Обработка userId
                    var randomUser = new UserDto()
                    {
                        UserId = userId,
                        Role = role.RoleName,
                        Username = existingUser.Username + (DateTime.Now - startTime).TotalSeconds.ToString(),
                        Avatar = existingUser.Avatar
                    };

                    var responseJson = JsonSerializer.Serialize(randomUser);
                    var bytesToSend = Encoding.UTF8.GetBytes(responseJson);

                    await webSocket.SendAsync(new ArraySegment<byte>(bytesToSend), WebSocketMessageType.Text, true, CancellationToken.None);

                    await Task.Delay(interval);
                }
                await webSocket.CloseAsync(receiveResult.CloseStatus.Value, receiveResult.CloseStatusDescription, CancellationToken.None);
            }
            else
            {
                // Если запрос не является WebSocket-запросом, возвращаем ошибку
                HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            }
        }
        //Метод для тестирования возможности обновить данные пользователя по соскету в режиме реального времени
        [Route("getRandomUserData")]
        public async Task GetRandomUserData()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                var startTime = DateTime.Now;
                var interval = TimeSpan.FromSeconds(1); // Интервал для обновления времени
                var buffer = new byte[1024 * 4];
                var receiveResult = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

                while (webSocket.State == WebSocketState.Open)
                {

                    // Проверяем, было ли закрыто соединение в процессе получения данных
                    var userId = int.Parse(Encoding.UTF8.GetString(buffer, 0, receiveResult.Count));

                    var existingUser = await _userRepository.GetUserById(userId);
                    var role = await _roleRepository.GetRoleById(existingUser.RoleId);
                    // Обработка userId
                    var randomUser = new UserDto()
                    {
                        UserId = userId,
                        Role = role.RoleName,
                        Username = existingUser.Username + (DateTime.Now - startTime).TotalSeconds.ToString(),
                        Avatar = existingUser.Avatar
                    };

                    var responseJson = JsonSerializer.Serialize(randomUser);
                    var bytesToSend = Encoding.UTF8.GetBytes(responseJson);

                    await webSocket.SendAsync(new ArraySegment<byte>(bytesToSend), WebSocketMessageType.Text, true, CancellationToken.None);

                    receiveResult = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

                    await Task.Delay(interval);

                }
            }
            else
            {
                // Если запрос не является WebSocket-запросом, возвращаем ошибку
                HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            }
        }
        private static async Task Echo(WebSocket webSocket, DateTime startTime)
        {
            var buffer = new byte[1024 * 4];
            var receiveResult = await webSocket.ReceiveAsync(
                new ArraySegment<byte>(buffer), CancellationToken.None);

            while (!receiveResult.CloseStatus.HasValue)
            {
                // Вычисляем время, прошедшее с момента открытия сокета
                var elapsedTime = DateTime.Now - startTime;

                // Формируем сообщение с временем открытия сокета
                var message = $"Hello from server! WebSocket opened for: {elapsedTime.TotalSeconds} seconds";

                // Преобразуем сообщение в байты
                var bytes = System.Text.Encoding.UTF8.GetBytes(message);

                // Отправляем сообщение обратно клиенту
                await webSocket.SendAsync(new ArraySegment<byte>(bytes), WebSocketMessageType.Text, true, CancellationToken.None);

                // Продолжаем получать следующие сообщения от клиента
                receiveResult = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            }

            // Если соединение закрыто, закрываем сокет
            await webSocket.CloseAsync(receiveResult.CloseStatus.Value, receiveResult.CloseStatusDescription, CancellationToken.None);
        }

        private static async Task SendTime(WebSocket webSocket, DateTime startTime)
        {
            var interval = TimeSpan.FromSeconds(1); // Интервал для обновления времени

            try
            {
                while (webSocket.State == WebSocketState.Open)
                {
                    // Формируем сообщение с текущим временем
                    var message = $"Hello from server! Current time: {DateTime.Now}";

                    // Преобразуем сообщение в байты
                    var bytes = System.Text.Encoding.UTF8.GetBytes(message);

                    // Отправляем сообщение обратно клиенту
                    await webSocket.SendAsync(new ArraySegment<byte>(bytes), WebSocketMessageType.Text, true, CancellationToken.None);

                    // Ожидаем заданный интервал перед отправкой следующего сообщения
                    await Task.Delay(interval);
                }
            }
            catch (WebSocketException)
            {
                // Обработка ошибок в случае прерывания соединения
            }
            finally
            {
                // Закрываем сокет после завершения цикла
                if (webSocket.State == WebSocketState.Open)
                {
                    await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Connection closed by server", CancellationToken.None);
                }
            }
        }

        [Route("time-connection")]
        public async Task Get()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();

                // Сохраняем время начала обработки запроса
                var startTime = DateTime.Now;

                await SendTime(webSocket, startTime);
            }
            else
            {
                HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            }
        }

        [Route("echo")]
        public async Task EchoHandler()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                var startTime = DateTime.Now;
                var interval = TimeSpan.FromSeconds(1); // Интервал для обновления времени
                var buffer = new byte[1024 * 4];
                var receiveResult = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

                while (webSocket.State == WebSocketState.Open)
                {
                    // Получаем строку от клиента
                    var receivedMessage = Encoding.UTF8.GetString(buffer, 0, receiveResult.Count);

                    //Условные преобразования
                    receivedMessage += (DateTime.Now - startTime).TotalSeconds.ToString();

                    // Отправляем эту же строку обратно клиенту
                    var bytesToSend = Encoding.UTF8.GetBytes(receivedMessage);
                    await webSocket.SendAsync(new ArraySegment<byte>(bytesToSend), WebSocketMessageType.Text, true, CancellationToken.None);

                    await Task.Delay(interval);
                }
                if (receiveResult.CloseStatus != null)
                {
                    // Если соединение закрыто, закрываем сокет
                    await webSocket.CloseAsync(receiveResult.CloseStatus.Value, receiveResult.CloseStatusDescription, CancellationToken.None);
                }
            }
            else
            {
                HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            }
        }
    }
}
