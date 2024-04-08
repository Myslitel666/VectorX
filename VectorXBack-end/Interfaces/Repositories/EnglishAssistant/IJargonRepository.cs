using VectorXBackend.DTOs.Requests.EnglishAssistant;
using VectorXBackend.Models.Entities;

namespace VectorXBackend.Interfaces.Repositories.EnglishAssistant
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
