using VectorXBackend.DTOs.Requests.AccountService;
using VectorXBackend.DTOs.Responses.AccountService;

namespace VectorXBackend.Interfaces.Services
{
    public interface IAccountService
    {
        Task<AuthorizationResponseDto> AuthorizeUser(UserDto userDto);

        Task<AuthorizationResponseDto> RegisterUser(UserDto userDto);
    }
}
