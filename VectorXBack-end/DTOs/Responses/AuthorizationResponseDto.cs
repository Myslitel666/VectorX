using EnglishAssistantBackend.DTOs.Requests;

namespace EnglishAssistantBackend.DTOs.Responses
{
    public class AuthorizationResponseDto : ResponseBase
    {
        public UserDto User { get; set; }
    }
}
