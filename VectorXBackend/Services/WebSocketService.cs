using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using VectorXBackend.Interfaces.Repositories.AccountService;
using VectorXBackend.DTOs.SharedDTOs;
using VectorXBackend.Interfaces.Services;
using VectorXBackend.Services;
using VectorXBackend.DTOs.Requests.WebSocketService;

namespace VectorXBackend.Services;

public class WebSocketService : IWebSocketService
{
    private readonly ConcurrentDictionary<UserConnectionInfo, WebSocket> _sockets = new ConcurrentDictionary<UserConnectionInfo, WebSocket>();

    public async Task AddOrUpdateSocket(UserConnectionInfo userConnectionInfo, WebSocket socket)
    {
        _sockets.AddOrUpdate(userConnectionInfo, socket, (key, existingSocket) => socket);
    }

    public async Task RemoveSocket(UserConnectionInfo userConnectionInfo)
    {
        _sockets.TryRemove(userConnectionInfo, out _);
    }

    public async Task<List<WebSocket>> GetWebSockets(int userId)
    {
        List<WebSocket> userSockets = new List<WebSocket>();

        foreach (var socket in _sockets)
        {
            if (socket.Key.UserId == userId)
            {
                userSockets.Add(socket.Value);
            }
        }

        return userSockets;
    }
}