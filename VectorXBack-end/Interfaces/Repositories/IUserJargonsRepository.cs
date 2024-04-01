using EnglishAssistantBackend.Models.Entities;

namespace EnglishAssistantBackend.Interfaces.Repositories
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
