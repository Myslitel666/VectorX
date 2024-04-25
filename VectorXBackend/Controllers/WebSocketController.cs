using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.WebSockets;
using System.Threading;

namespace VectorXBackend.Controllers
{
    [Route("ws")]
    [ApiController]
    public class WebSocketController : ControllerBase
    {
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
            var buffer = new byte[1024 * 4];
            var interval = TimeSpan.FromSeconds(1); // Интервал для обновления времени

            try
            {
                while (webSocket.State == WebSocketState.Open)
                {
                    // Вычисляем время, прошедшее с момента открытия сокета
                    var elapsedTime = DateTime.Now - startTime;

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
    }
}
