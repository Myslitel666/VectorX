using VectorXBackend.Models.Entities;
using VectorXBackend.DTOs.Requests;

namespace VectorXBackend.Interfaces.Repositories.AccountService
{
    public interface IUserRepository
    {
        Task<User> GetUserByUsername(string username);

        Task<User> GetUserById(int userId);

        Task<User> GetUserByPassword(string password);

        Task AddUser(User user);
    }
}
