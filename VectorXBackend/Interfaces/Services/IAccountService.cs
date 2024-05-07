using VectorXBackend.DTOs.Requests.AccountService;
using VectorXBackend.DTOs.Responses.AccountService;
using VectorXBackend.DTOs.SharedDTOs;

namespace VectorXBackend.Interfaces.Services
{
    public interface IAccountService
    {
        Task<AuthResponseDto> AuthorizeUser(UserDto userDto);

        Task<AuthResponseDto> RegisterUser(UserDto userDto);

        Task<VerifyResponseDto> VerifyUser(VerifyUserDto verifyUserDto);

        Task<UserDataRedactDto> RedactUserData(UsernameRedactDto usernameRedactDto);

        Task<UserDataRedactDto> RedactUserData(PasswordRedactDto passwordRedactDto);

        Task<UserDataRedactDto> RedactUserData(AvatarRedactDto avatarRedactDto);

        Task<UsersDto> GetCachedUsers(CachedUserIdsDto cachedUserIdsDto);

        Task<UsersDto> GetAllUsers();

        Task<UserDataRedactDto> UpdateUser(UpdateUserDataDto updateUserDataDto);

        Task<UserDataRedactDto> BlockUser(int userId);

        Task<UserDataRedactDto> UnblockUser(int userId);
    }
}
