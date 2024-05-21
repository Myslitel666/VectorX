using VectorXBackend.DTOs.SharedDTOs;

namespace VectorXBackend.DTOs.Responses.AccountService
{
    public class AuthResponseDto : ResponseBaseDto
    {
        public UserDto User { get; set; }
    }
}