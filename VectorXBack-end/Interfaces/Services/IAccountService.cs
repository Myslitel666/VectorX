using EnglishAssistantBackend.DTOs.Requests;
using EnglishAssistantBackend.DTOs.Responses;

namespace EnglishAssistantBackend.Interfaces.Services
{
    public interface IAccountService
    {
        Task<AuthorizationResponseDto> AuthorizeUser(UserDto userDto);

        Task<AuthorizationResponseDto> RegisterUser(UserDto userDto);
    }
}
