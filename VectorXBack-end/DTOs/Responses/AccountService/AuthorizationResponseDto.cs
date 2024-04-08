using VectorXBackend.DTOs.Requests.AccountService;

namespace VectorXBackend.DTOs.Responses.AccountService
{
    public class AuthorizationResponseDto : ResponseBase
    {
        public UserDto User { get; set; }
    }
}
