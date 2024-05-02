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
                var interval = TimeSpan.FromSeconds(1); // Интервал для обновления времени
                var buffer = new byte[1024 * 4];
                var cancellationTokenSource = new CancellationTokenSource();
                var receiveResult = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

                var userId = int.Parse(Encoding.UTF8.GetString(buffer, 0, receiveResult.Count));
                ///
                // Получаем Scoped сервис IUserRepository через делегат
                var scope = _serviceProvider.CreateScope();
                var userRepository = scope.ServiceProvider.GetRequiredService<IUserRepository>();
                var roleRepository = scope.ServiceProvider.GetRequiredService<IRoleRepository>();

                var existingUser = await userRepository.GetUserById(userId);
                var role = await roleRepository.GetRoleById(existingUser.RoleId);
                var updatedUser = new UserDto()
                {
                    UserId = userId,
                    Role = role.RoleName,
                    Username = existingUser.Username, // Не добавляем здесь время
                    Avatar = existingUser.Avatar
                };

                var responseJson = JsonSerializer.Serialize(updatedUser);
                var bytesToSend = Encoding.UTF8.GetBytes(responseJson);

                await webSocket.SendAsync(new ArraySegment<byte>(bytesToSend), WebSocketMessageType.Text, true, CancellationToken.None);
                await _webSocketService.AddSocket(userId, webSocket);
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
                        break;
                    }

                    // Если клиент закрыл соединение, выходим из цикла
                    if (receiveResult.CloseStatus != null)
                    {
                        break;
                    }
                }
                //receiveResult = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

                //await Task.Delay(interval);

                if (receiveResult.CloseStatus != null)
                {
                    await webSocket.CloseAsync(receiveResult.CloseStatus.Value, receiveResult.CloseStatusDescription, CancellationToken.None);
                }
                ///
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

                var userId = int.Parse(Encoding.UTF8.GetString(buffer, 0, receiveResult.Count));

                var userWebSocket = await _webSocketService.HandleAdminUpdate(userId);

                // Получаем Scoped сервис IUserRepository через делегат
                var scope = _serviceProvider.CreateScope();
                var userRepository = scope.ServiceProvider.GetRequiredService<IUserRepository>();
                var roleRepository = scope.ServiceProvider.GetRequiredService<IRoleRepository>();

                var existingUser = await userRepository.GetUserById(userId);
                var role = await roleRepository.GetRoleById(existingUser.RoleId);
                var updatedUser = new UserDto()
                {
                    UserId = userId,
                    Role = role.RoleName,
                    Username = existingUser.Username, // Не добавляем здесь время
                    Avatar = existingUser.Avatar
                };

                var responseJson = JsonSerializer.Serialize(updatedUser);
                var bytesToSend = Encoding.UTF8.GetBytes(responseJson);

                await userWebSocket.SendAsync(new ArraySegment<byte>(bytesToSend), WebSocketMessageType.Text, true, CancellationToken.None);
            }
            else
            {
                HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            }
        }
    }
}
