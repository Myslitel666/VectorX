using System.Net.WebSockets;
using VectorXBackend.DTOs.Requests.WebSocketService;

namespace VectorXBackend.Interfaces.Services
{
    public interface IWebSocketService
    {
        Task AddOrUpdateSocket(UserConnectionInfo userConnectionInfo, WebSocket socket);

        Task RemoveSocket(UserConnectionInfo userConnectionInfo);

        Task<List<WebSocket>> GetWebSockets(int userId);
    }
}