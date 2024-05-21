using VectorXBackend.Models.Entities;
using VectorXBackend.DTOs.Requests.VectorX.TakingCourses;
using VectorXBackend.DTOs.Requests.AccountService;

namespace VectorXBackend.Interfaces.Repositories.AccountService
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllUsers();
        Task<User> GetUserByUsername(string username);

        Task<User> GetUserById(int userId);

        Task<User> GetUserByPassword(string password);

        Task<List<User>> GetUsersByIds(int[] userIds);

        Task AddUser(User user);

        Task RedactUserData(TopUpBalanceDto topUpBalanceDto);

        Task RedactUserData(UsernameRedactDto usernameRedactDto);

        Task RedactUserData(PasswordRedactDto passwordRedactDto);

        Task RedactUserData(AvatarRedactDto avatarRedactDto);

        Task RedactUserData(int userId, int userRoleId, string username);

        Task RedactUserBlockStatus(int userId, bool isBlock);
    }
}
