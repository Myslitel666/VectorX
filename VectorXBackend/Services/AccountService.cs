using VectorXBackend.Interfaces.Services;
using VectorXBackend.Interfaces.Repositories.AccountService;
using VectorXBackend.Models.Entities;
using VectorXBackend.DTOs.Requests.AccountService;
using VectorXBackend.DTOs.Responses.AccountService;
using VectorXBackend.DTOs.SharedDTOs;

namespace VectorXBackend.Services
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

        public async Task<AuthResponseDto> AuthorizeUser(UserDto userDto)
        {
            //Извлекаем пользователя из списка по username (в случае его отсутствия получим null)
            var existingUser = await _userRepository.GetUserByUsername(userDto.Username);

            //Если пользователя с данным username не существует
            if (existingUser == null)
            {
                var response = new AuthResponseDto()
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
                    var response = new AuthResponseDto()
                    {
                        IsError = true,
                        FeedbackMessage = "✗The password is incorrect"
                    };
                    return response;
                }
                //Если пользователь был заблокирован
                else if (existingUser.IsBlocked == true)
                {
                    var response = new AuthResponseDto()
                    {
                        IsError = true,
                        FeedbackMessage = "✗The user was blocked"
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
                            UserRole = role.RoleName,
                            Username = existingUser.Username,
                            Avatar = existingUser.Avatar,
                            IsBlocked = existingUser.IsBlocked,
                            Balance = existingUser.Balance,
                        };

                        var response = new AuthResponseDto()
                        {
                            IsError = false,
                            FeedbackMessage = "✓User successfully authorized",
                            User = userResponseDto
                        };
                        return response;
                    }
                    catch (Exception ex)
                    {
                        AuthResponseDto response = new AuthResponseDto()
                        {
                            IsError = true,
                            FeedbackMessage = $"✗Failed to complete the authorization. Error: {ex.Message}"
                        };
                        return response;
                    }
                }
            }
        }

        public async Task<AuthResponseDto> RegisterUser(UserDto userDto)
        {
            //Извлекаем пользователя из списка по username (в случае его отсутствия получим null)
            var existingUser = await _userRepository.GetUserByUsername(userDto.Username);

            //Если пользователь с данным username уже присутствует в System
            if (existingUser != null)
            {
                var response = new AuthResponseDto()
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
                var response = new AuthResponseDto()
                {
                    IsError = true,
                    FeedbackMessage = "✗This password is already taken"
                };
                return response;
            }

            try
            {
                //Получаем идентификатор роли по её имени из базы данных
                var role = await _roleRepository.GetIdByRole(userDto.UserRole);

                if (role == null)
                {
                    var response = new AuthResponseDto()
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
                        Username = userDto.Username,
                        Password = userDto.Password,
                        RoleId = role.RoleId,
                        IsBlocked = false,
                        Balance = 0
                    };
                    await _userRepository.AddUser(user);

                    //Извлекаем пользователя из списка по username для отправки на client
                    //var registeredUser = await _userRepository.GetUserByUsername(userDto.Username);

                    //Создаю экземпляр UserDto для отправки клиенту
                    var userResponseDto = new UserDto()
                    {
                        UserId = user.UserId,
                        Username = user.Username,
                        UserRole = role.RoleName,
                        IsBlocked = false
                    };

                    var response = new AuthResponseDto()
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
                var response = new AuthResponseDto()
                {
                    IsError = true,
                    FeedbackMessage = $"✗Failed to complete the registration. Error: {ex.Message}"
                };
                return response;
            }
        }

        public async Task<VerifyResponseDto> VerifyUser(VerifyUserDto verifyUserDto)
        {
            //Извлекаем пользователя из списка по userId (в случае его отсутствия получим null)
            var existingUser = await _userRepository.GetUserById(verifyUserDto.UserId);

            //Если пользователь с данным userId существует
            if (existingUser != null)
            {
                //Если пароль не верный
                if (existingUser.Password != verifyUserDto.EnteredPassword)
                {
                    var response = new VerifyResponseDto()
                    {
                        IsError = true,
                        FeedbackMessage = "✗The password is incorrect"
                    };
                    return response;
                }
                else
                {
                    return new VerifyResponseDto()
                    {
                        IsError = false,
                        FeedbackMessage = $"✓Verification was successful"
                    };
                }
            }

            //Если пользователя с данным userId не было обнаружено репозиторием
            return new VerifyResponseDto()
            {
                IsError = true,
                FeedbackMessage = $"✗Verification failed. You may have been removed from the system."
            };
        }

        public async Task<UserDataRedactDto> RedactUserData(UsernameRedactDto usernameRedactDto)
        {
            //Извлекаем пользователя из списка по userId (в случае его отсутствия получим null)
            var existingUser = await _userRepository.GetUserById(usernameRedactDto.UserId);

            //Если пользователь с данным userId существует
            if (existingUser != null)
            {
                //Проверяем, существует ли пользователь с желаемым usernam'ом другим пользователем
                var potentialUser = await _userRepository.GetUserByUsername(usernameRedactDto.DesiredUsername);

                //Если пользователь с данным username уже существует
                if (potentialUser != null)
                {
                    var response = new UserDataRedactDto()
                    {
                        IsError = true,
                        FeedbackMessage = "✗A user with this username already exists"
                    };
                    return response;
                }
                else
                {
                    try
                    {
                        await _userRepository.RedactUserData(usernameRedactDto);

                        var response = new UserDataRedactDto()
                        {
                            IsError = false,
                            FeedbackMessage = "✓The username has been successfully changed"
                        };
                        return response;
                    }
                    catch (Exception ex)
                    {
                        var response = new UserDataRedactDto()
                        {
                            IsError = true,
                            FeedbackMessage = $"✗Failed to change the username. Error: {ex.Message}"
                        };
                        return response;
                    }
                }
            }

            //Если пользователя с данным userId не было обнаружено репозиторием
            return new UserDataRedactDto()
            {
                IsError = true,
                FeedbackMessage = $"✗Failed to change the username. You may have been removed from the system."
            };
        }

        public async Task<UserDataRedactDto> RedactUserData(PasswordRedactDto passwordRedactDto)
        {
            //Извлекаем пользователя из списка по userId (в случае его отсутствия получим null)
            var existingUser = await _userRepository.GetUserById(passwordRedactDto.UserId);

            //Если пользователь с данным userId существует
            if (existingUser != null)
            {
                //Проверяем, занят ли желаемый пароль другим пользователем
                var potentialUser = await _userRepository.GetUserByPassword(passwordRedactDto.DesiredPassword);

                //Если пароль уже занят
                if (potentialUser != null)
                {
                    var response = new UserDataRedactDto()
                    {
                        IsError = true,
                        FeedbackMessage = "✗This password is already taken"
                    };
                    return response;
                }
                else
                {
                    try
                    {
                        await _userRepository.RedactUserData(passwordRedactDto);

                        var response = new UserDataRedactDto()
                        {
                            IsError = false,
                            FeedbackMessage = "✓The password has been successfully changed"
                        };
                        return response;
                    }
                    catch (Exception ex)
                    {
                        var response = new UserDataRedactDto()
                        {
                            IsError = true,
                            FeedbackMessage = $"✗Failed to change the password. Error: {ex.Message}"
                        };
                        return response;
                    }
                }
            }

            //Если пользователя с данным userId не было обнаружено репозиторием
            return new UserDataRedactDto()
            {
                IsError = true,
                FeedbackMessage = $"✗Failed to change the password. You may have been removed from the system."
            };
        }

        public async Task<UserDataRedactDto> RedactUserData(AvatarRedactDto avatarRedactDto)
        {
            try
            {
                var user = await _userRepository.GetUserById(avatarRedactDto.UserId);

                if (user == null)
                {
                    return new UserDataRedactDto
                    {
                        IsError = true,
                        FeedbackMessage = "✗User not found"
                    };
                }

                await _userRepository.RedactUserData(avatarRedactDto);

                return new UserDataRedactDto
                {
                    IsError = false,
                    FeedbackMessage = "✓Avatar changed successfully"
                };
            }
            catch (Exception ex)
            {
                return new UserDataRedactDto
                {
                    IsError = true,
                    FeedbackMessage = $"✗Failed to update avatar. Error: {ex.Message}"
                };
            }
        }

        public async Task<UsersDto> GetCachedUsers(CachedUserIdsDto cachedUserIdsDto)
        {
            //Извлекаем список пользователей по Id (в случае его отсутствия получим null)
            var cachedUsers = await _userRepository.GetUsersByIds(cachedUserIdsDto.UserIds);

            var cachedUsersDto = new UsersDto();

            if (cachedUsers != null)
            {
                //Создаём массив идентификаторов ролей пользователей
                var rolesIdsUsers = new int[cachedUsers.Count];

                //Заполняем массив идентификаторами ролей пользователей
                for (int i = 0; i < cachedUsers.Count; i++)
                {
                    rolesIdsUsers[i] = cachedUsers[i].RoleId;
                }

                var rolesUsers = await _roleRepository.GetRolesByIds(rolesIdsUsers); //Извлекаем роли пользователей по их Id
                var userDtos = new UserDto[cachedUsers.Count];

                //Заполняем массив UserDto элементов
                for (int i = 0; i < cachedUsers.Count; i++)
                {
                    //var role = rolesUsers.FirstOrDefault(role => role.RoleId == cachedUsers[i].RoleId);
                    userDtos[i] = new UserDto
                    {
                        UserId = cachedUsers[i].UserId,
                        Username = cachedUsers[i].Username,
                        UserRole = rolesUsers.FirstOrDefault(role => role.RoleId == cachedUsers[i].RoleId).RoleName,
                        Avatar = cachedUsers[i].Avatar,
                        IsBlocked = cachedUsers[i].IsBlocked,
                    };
                }

                cachedUsersDto.UserDtos = userDtos;
            }

            return cachedUsersDto;
        }

        public async Task<UsersDto> GetAllUsers()
        {
            var rolesUsers = await _roleRepository.GetAllRoles(); //Извлекаем роли пользователей
            var users = await _userRepository.GetAllUsers(); //Извлекаем всех пользователей

            var usersDto = new UsersDto();

            var userDtos = new UserDto[users.Count];

            //Заполняем массив UserDto элементов
            for (int i = 0; i < users.Count; i++)
            {
                //var role = rolesUsers.FirstOrDefault(role => role.RoleId == cachedUsers[i].RoleId);
                userDtos[i] = new UserDto
                {
                    UserId = users[i].UserId,
                    Username = users[i].Username,
                    UserRole = rolesUsers.FirstOrDefault(role => role.RoleId == users[i].RoleId).RoleName,
                    Avatar = users[i].Avatar,
                    IsBlocked = users[i].IsBlocked,
                };
            }

            usersDto.UserDtos = userDtos;

            return usersDto;
        }

        public async Task<UserDataRedactDto> UpdateUser(UpdateUserDataDto updateUserDataDto)
        {
            var potentalUser = await _userRepository.GetUserByUsername(updateUserDataDto.DesiredUsername);

            //Если пользователь с данным username уже существует
            if ((potentalUser != null) && (potentalUser.UserId != updateUserDataDto.UserId))
            {
                var response = new UserDataRedactDto()
                {
                    IsError = true,
                    FeedbackMessage = "✗A user with this username already exists"
                };
                return response;
            }
            else
            {
                var desiredUserRoleId = await _roleRepository.GetIdByRole(updateUserDataDto.DesiredUserRole);

                //Если желаемая роль найдена в базе
                if (desiredUserRoleId != null)
                {
                    try
                    {
                        await _userRepository.RedactUserData(updateUserDataDto.UserId, desiredUserRoleId.RoleId, updateUserDataDto.DesiredUsername);

                        var response = new UserDataRedactDto()
                        {
                            IsError = false,
                            FeedbackMessage = $"✓{updateUserDataDto.DesiredUsername} user data has been successfully modified"
                        };
                        return response;
                    }
                    catch (Exception ex)
                    {
                        var response = new UserDataRedactDto()
                        {
                            IsError = true,
                            FeedbackMessage = $"✗Error: {ex}"
                        };
                        return response;
                    }
                }
                else
                {
                    var response = new UserDataRedactDto()
                    {
                        IsError = true,
                        FeedbackMessage = "✗This role does not exist"
                    };
                    return response;
                }
            }


        }

        public async Task<UserDataRedactDto> BlockUser(int userId)
        {
            try
            {
                await _userRepository.RedactUserBlockStatus(userId, true);

                return new UserDataRedactDto()
                {
                    IsError = false,
                    FeedbackMessage = "✓The user has been successfully blocked."
                };
            }
            catch (Exception ex)
            {
                return new UserDataRedactDto()
                {
                    IsError = true,
                    FeedbackMessage = $"✗Error: {ex}"
                };
            }
        }

        public async Task<UserDataRedactDto> UnblockUser(int userId)
        {
            try
            {
                await _userRepository.RedactUserBlockStatus(userId, false);

                return new UserDataRedactDto()
                {
                    IsError = false,
                    FeedbackMessage = "✓The user has been successfully unblocked."
                };
            }
            catch (Exception ex)
            {
                return new UserDataRedactDto()
                {
                    IsError = true,
                    FeedbackMessage = $"✗Error: {ex}"
                };
            }
        }
    }
}
