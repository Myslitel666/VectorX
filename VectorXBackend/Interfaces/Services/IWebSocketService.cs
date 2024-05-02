using System.Net.WebSockets;

namespace VectorXBackend.Interfaces.Services
{
    public interface IWebSocketService
    {
        Task AddSocket(int userId, WebSocket socket);

        Task RemoveSocket(int userId);

        Task<WebSocket> HandleAdminUpdate(int userId);
    }
}