using VectorXBackend.Models.Entities;

namespace VectorXBackend.Interfaces.Repositories.EnglishAssistant
{
    public interface IUserJargonsRepository
    {
        Task<IEnumerable<string>> GetJargonsByUserId(int userId);

        Task<IEnumerable<int>> GetJargonIdsByUserId(int userId);

        Task<UserJargon> GetUserJargon(int userId, int jargonId);

        Task AddUserJargon(UserJargon uderJargon);

        Task DeleteUserJargon(int userId, int jargonId);
    }
}
