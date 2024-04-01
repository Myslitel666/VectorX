using EnglishAssistantBackend.Interfaces.Services;
using EnglishAssistantBackend.Interfaces.Repositories;
using EnglishAssistantBackend.Models.Entities;
using EnglishAssistantBackend.DTOs.Requests;
using EnglishAssistantBackend.DTOs.Responses;

namespace EnglishAssistantBackend.Services
{
    public class AccountService : IAccountService
    {
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;

        public AccountService(IUserRepository userRepository, IRoleRepository roleRepository)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
        }

        public async Task<AuthorizationResponseDto> AuthorizeUser(UserDto userDto)
        {
            //Извлекаем пользователя из списка по username (в случае его отсутствия получим null)
            var existingUser = await _userRepository.GetUserByUsername(userDto.Username);

            //Если пользователя с данным username не существует
            if (existingUser == null)
            {
                var response = new AuthorizationResponseDto()
                {
                    IsError = true,
                    FeedbackMessage = "✗A user with this username does not exist"
                };
                return response;
            }
            else
            {
                //Если пароль не верный
                if (existingUser.Password != userDto.Password)
                {
                    var response = new AuthorizationResponseDto()
                    {
                        IsError = true,
                        FeedbackMessage = "✗The password is incorrect"
                    };
                    return response;
                }
                else
                {
                    try
                    {
                        // Получаем роль пользователя по её идентификатору в базе данных
                        var role = await _roleRepository.GetRoleById(existingUser.RoleId);

                        //Создаю экземпляр UserDto
                        var userResponseDto = new UserDto()
                        {
                            UserId = existingUser.UserId,
                            Role = role.RoleName,
                            Username = existingUser.Username,
                        };

                        var response = new AuthorizationResponseDto()
                        {
                            IsError = false,
                            FeedbackMessage = "✓User successfully authorized",
                            User = userResponseDto
                        };
                        return response;
                    }
                    catch (Exception ex)
                    {
                        AuthorizationResponseDto response = new AuthorizationResponseDto()
                        {
                            IsError = true,
                            FeedbackMessage = $"✗Failed to complete the authorization. Error: {ex.Message}"
                        };
                        return response;
                    }
                }
            }
        }

        public async Task<AuthorizationResponseDto> RegisterUser(UserDto userDto)
        {
            //Извлекаем пользователя из списка по username (в случае его отсутствия получим null)
            var existingUser = await _userRepository.GetUserByUsername(userDto.Username);

            //Если пользователь с данным username уже присутствует в System
            if (existingUser != null)
            {
                var response = new AuthorizationResponseDto()
                {
                    IsError = true,
                    FeedbackMessage = "✗A user with this username already exists"
                };
                return response;
            }

            //Извлекаем пользователя из списка по паролю (в случае его отсутствия получим null)
            existingUser = await _userRepository.GetUserByPassword(userDto.Password);

            //Если пользователь с данным паролем уже присутствует в System
            if (existingUser != null)
            {
                var response = new AuthorizationResponseDto()
                {
                    IsError = true,
                    FeedbackMessage = "✗This password is already taken"
                };
                return response;
            }

            try
            {
                //Получаем идентификатор роли по её имени из базы данных
                var role = await _roleRepository.GetIdByRole(userDto.Role);

                if (role == null)
                {
                    var response = new AuthorizationResponseDto()
                    {
                        IsError = true,
                        FeedbackMessage = "✗Role does not exist"
                    };
                    return response;
                }
                else
                {
                    var user = new User
                    {
                        RoleId = role.RoleId,
                        Username = userDto.Username,
                        Password = userDto.Password,
                    };
                    await _userRepository.AddUser(user);

                    //Извлекаем пользователя из списка по username для отправки на client
                    var registeredUser = await _userRepository.GetUserByUsername(userDto.Username);

                    //Создаю экземпляр UserDto
                    var userResponseDto = new UserDto()
                    {
                        UserId = registeredUser.UserId,
                        Role = role.RoleName,
                        Username = registeredUser.Username,
                    };

                    var response = new AuthorizationResponseDto()
                    {
                        IsError = false,
                        FeedbackMessage = "✓User successfully registered",
                        User = userResponseDto
                    };
                    return response;
                }
            }
            catch (Exception ex)
            {
                var response = new AuthorizationResponseDto()
                {
                    IsError = true,
                    FeedbackMessage = $"✗Failed to complete the registration. Error: {ex.Message}"
                };
                return response;
            }
        }
    }
}
