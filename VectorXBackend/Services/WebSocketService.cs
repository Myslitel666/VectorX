using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using VectorXBackend.Interfaces.Repositories.AccountService;
using VectorXBackend.DTOs.SharedDTOs;
using VectorXBackend.Interfaces.Services;
using VectorXBackend.Services;
using VectorXBackend.Context;

namespace VectorXBackend.Services
{
    public class WebSocketService : IWebSocketService
    {
        private readonly ConcurrentDictionary<int, WebSocket> _sockets = new ConcurrentDictionary<int, WebSocket>();

        public async Task AddSocket(int userId, WebSocket socket)
        {
            _sockets.AddOrUpdate(userId, socket, (key, existingSocket) => socket);
        }

        public async Task RemoveSocket(int userId)
        {
            _sockets.TryRemove(userId, out _);
        }

        public async Task<WebSocket> HandleAdminUpdate(int userId)
        {
            if (_sockets.TryGetValue(userId, out WebSocket socket))
            {
                return socket;
            }

            return null;
        }
    }
}
