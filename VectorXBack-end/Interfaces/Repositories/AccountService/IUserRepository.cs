using VectorXBackend.Models.Entities;
using VectorXBackend.DTOs.Requests;
using VectorXBackend.DTOs.Requests.AccountService;

namespace VectorXBackend.Interfaces.Repositories.AccountService
{
    public interface IUserRepository
    {
        Task<User> GetUserByUsername(string username);

        Task<User> GetUserById(int userId);

        Task<User> GetUserByPassword(string password);

        Task AddUser(User user);

        Task RedactUserData(UsernameRedactDto usernameRedactDto);

        Task RedactUserData(PasswordRedactDto passwordRedactDto);
    }
}
