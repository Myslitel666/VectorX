using VectorXBackend.DTOs.Requests.AccountService;

namespace VectorXBackend.DTOs.Responses.AccountService
{
    public class AuthResponseDto : ResponseBase
    {
        public UserDto User { get; set; }
    }
}