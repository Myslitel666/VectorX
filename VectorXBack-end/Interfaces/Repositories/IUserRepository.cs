using EnglishAssistantBackend.Models.Entities;
using EnglishAssistantBackend.DTOs.Requests;

namespace EnglishAssistantBackend.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUserByUsername(string username);

        Task<User> GetUserById(int userId);

        Task<User> GetUserByPassword(string password);

        Task AddUser(User user);
    }
}
