using EnglishAssistantBackend.DTOs.Requests;
using EnglishAssistantBackend.DTOs.Responses;
using EnglishAssistantBackend.Models.Entities;

namespace EnglishAssistantBackend.Interfaces.Services
{
    public interface IJargonDictionaryService
    {
        Task<IEnumerable<Jargon>> GetUserJargons(int userId);

        Task<JargonResponseDto> AddJargon(JargonDto jargonDto);

        Task<JargonResponseDto> ModifyJargon(JargonDto jargonDto);

        Task<JargonResponseDto> DeleteJargon(JargonDto jargonDto);
    }
}
