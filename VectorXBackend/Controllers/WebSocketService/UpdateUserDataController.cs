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
using VectorXBackend.DTOs.Requests.WebSocketService;

namespace VectorXBackend.Controllers.WebSocketService
{
    [Route("ws")]
    [ApiController]
    public class UpdateUserDataContoller : ControllerBase
    {
        private readonly IWebSocketService _webSocketService;
        private readonly IServiceProvider _serviceProvider;

        public UpdateUserDataContoller(IWebSocketService webSocketService, IServiceProvider serviceProvider)
        {
            _webSocketService = webSocketService ?? throw new ArgumentNullException(nameof(webSocketService));
            _serviceProvider = serviceProvider;
        }

        [Route("connect")]
        public async Task ConnectWebSocket()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                var buffer = new byte[1024 * 4];
                var cancellationTokenSource = new CancellationTokenSource();
                try
                {
                    var receiveResult = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                    // Проверяем, что полученные данные не пустые
                    if (receiveResult.Count > 0)
                    {
                        var receivedData = Encoding.UTF8.GetString(buffer, 0, receiveResult.Count);
                        var userConnectionInfo = JsonSerializer.Deserialize<UserConnectionInfo>(receivedData);

                        if (userConnectionInfo.UserId > 0)
                        {
                            //Осуществляем отправку данных пользователю
                            await SendUserData(userConnectionInfo.UserId, webSocket);

                            //Добавляем сокет пользователя в Web Socket Service, чтобы администратор смог вносить обновления
                            await _webSocketService.AddOrUpdateSocket(userConnectionInfo, webSocket);

                            // Здесь мы запускаем бесконечный цикл, который ждет входящих сообщений от клиента
                            while (!cancellationTokenSource.Token.IsCancellationRequested)
                            {
                                try
                                {
                                    receiveResult = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), cancellationTokenSource.Token);
                                }
                                catch (WebSocketException ex)
                                {
                                    // Обработка исключения, возникающего при попытке чтения из закрытого сокета
                                    // Например, прерывание цикла или другие действия
                                    await _webSocketService.RemoveSocket(userConnectionInfo);
                                    break;
                                }

                                // Если клиент закрыл соединение, выходим из цикла
                                if (receiveResult.CloseStatus != null)
                                {
                                    await _webSocketService.RemoveSocket(userConnectionInfo);
                                    break;
                                }
                            }

                            if (receiveResult.CloseStatus != null)
                            {
                                await webSocket.CloseAsync(receiveResult.CloseStatus.Value, receiveResult.CloseStatusDescription, CancellationToken.None);
                            }
                        }
                    }
                }
                catch (WebSocketException ex) when (ex.WebSocketErrorCode == WebSocketError.ConnectionClosedPrematurely)
                {
                    // Обработка закрытия соединения WebSocket без завершения close handshake
                    await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Connection closed prematurely", CancellationToken.None);
                }
            }
            else
            {
                HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            }
        }

        [Route("admin/update")]
        public async Task AdminUpdate()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                var buffer = new byte[1024 * 4];
                var receiveResult = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

                //Извлекаем список userId
                string userIdsString = Encoding.UTF8.GetString(buffer, 0, receiveResult.Count);
                string[] userIds = userIdsString.Split(' ');

                foreach (string userIdStr in userIds)
                {
                    if (int.TryParse(userIdStr, out int userId))
                    {
                        // Извлекаем Web Socket'ы пользователя по его id, и отправляем новые данные
                        var userWebSockets = await _webSocketService.GetWebSockets(userId);
                        foreach (var userWebSocket in userWebSockets)
                        {
                            await SendUserData(userId, userWebSocket);
                        }
                    }
                }

            }
            else
            {
                HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            }
        }

        private async Task SendUserData(int userId, WebSocket webSocket)
        {
            // Получаем Scoped сервис IUserRepository через делегат
            using (var scope = _serviceProvider.CreateScope())
            {
                var userRepository = scope.ServiceProvider.GetRequiredService<IUserRepository>();
                var roleRepository = scope.ServiceProvider.GetRequiredService<IRoleRepository>();

                var existingUser = await userRepository.GetUserById(userId);
                var role = await roleRepository.GetRoleById(existingUser.RoleId);
                var updatedUser = new UserDto()
                {
                    UserId = userId,
                    UserRole = role.RoleName,
                    Username = existingUser.Username, // Не добавляем здесь время
                    Avatar = existingUser.Avatar,
                    IsBlocked = existingUser.IsBlocked,
                    Balance = existingUser.Balance
                };

                var responseJson = JsonSerializer.Serialize(updatedUser);
                var bytesToSend = Encoding.UTF8.GetBytes(responseJson);

                await webSocket.SendAsync(new ArraySegment<byte>(bytesToSend), WebSocketMessageType.Text, true, CancellationToken.None);
            }
        }
    }
}
