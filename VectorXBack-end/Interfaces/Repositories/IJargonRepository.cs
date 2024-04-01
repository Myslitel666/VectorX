using EnglishAssistantBackend.DTOs.Requests;
using EnglishAssistantBackend.Models.Entities;

namespace EnglishAssistantBackend.Interfaces.Repositories
{
    public interface IJargonRepository
    {
        Task<Jargon> GetJargonById(int jargonId);

        Task<IEnumerable<Jargon>> GetUserJargons(IEnumerable<int> jargonIds);

        Task<int> AddJargon(Jargon jargon);

        Task ModifyJargon(JargonDto jargonDto);

        Task DeleteJargon(int jargonId);
    }
}
