using VectorXBackend.DTOs.Requests.EnglishAssistant;
using VectorXBackend.DTOs.Responses.EnglishAssistant;
using VectorXBackend.Models.Entities;

namespace VectorXBackend.Interfaces.Services
{
    public interface IEnglishAssistantService
    {
        Task<IEnumerable<Jargon>> GetUserJargons(int userId);

        Task<JargonResponseDto> AddJargon(JargonDto jargonDto);

        Task<JargonResponseDto> ModifyJargon(JargonDto jargonDto);

        Task<JargonResponseDto> DeleteJargon(JargonDto jargonDto);
    }
}
