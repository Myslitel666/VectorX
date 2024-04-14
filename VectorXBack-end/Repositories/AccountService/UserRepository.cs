using VectorXBackend.Context;
using VectorXBackend.Interfaces.Repositories.AccountService;
using VectorXBackend.DTOs.Requests.AccountService;
using VectorXBackend.Models.Entities;
using Microsoft.EntityFrameworkCore;
using VectorXBackend.DTOs.Requests.EnglishAssistant;

namespace VectorXBackend.Repositories.AccountService
{
    public class UserRepository : IUserRepository
    {
        private readonly VectorXContext _dbContext;

        public UserRepository(VectorXContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User> GetUserByUsername(string username)
        {
            return await _dbContext.Users
            .FirstOrDefaultAsync(user => user.Username == username);
        }

        public async Task<User> GetUserById(int userId)
        {
            return await _dbContext.Users
            .FirstOrDefaultAsync(user => user.UserId == userId);
        }

        public async Task<User> GetUserByPassword(string password)
        {
            return await _dbContext.Users
            .FirstOrDefaultAsync(user => user.Password == password);
        }

        public async Task AddUser(User user)
        {
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RedactUserData(UsernameRedactDto usernameRedactDto)
        {
            var user = await GetUserById(usernameRedactDto.UserId); // Извлекаем пользователя по Id
            if (user != null)
            {
                user.Username = usernameRedactDto.DesiredUsername; // Меняем Username
                _dbContext.Users.Update(user); //Обновляем контекст базы данных
            }
            await _dbContext.SaveChangesAsync(); // Сохраняем изменения
        }

        public async Task RedactUserData(PasswordRedactDto passwordRedactDto)
        {
            var user = await GetUserById(passwordRedactDto.UserId); // Извлекаем пользователя по Id

            if (user != null)
            {
                user.Password = passwordRedactDto.DesiredPassword; // Меняем Password
                _dbContext.Users.Update(user); //Обновляем контекст базы данных
            }

            await _dbContext.SaveChangesAsync(); // Сохраняем изменения
        }

        public async Task RedactUserData(AvatarRedactDto avatarRedactDto)
        {
            var user = await GetUserById(avatarRedactDto.UserId); // Извлекаем пользователя по Id

            if (user != null)
            {
                string base64String = avatarRedactDto.Avatar.Replace("data:image/png;base64,", "");

                // Преобразуем строку Base64 в массив байт
                byte[] avatarBytes = Convert.FromBase64String(base64String);

                user.Avatar = avatarBytes; // Присваиваем массив байт полю Avatar пользователя
                _dbContext.Users.Update(user); //Обновляем контекст базы данных
            }

            await _dbContext.SaveChangesAsync(); // Сохраняем изменения
        }
    }
}
