﻿using VectorXBackend.Context;
using VectorXBackend.Interfaces.Repositories.AccountService;
using VectorXBackend.DTOs.Requests.AccountService;
using VectorXBackend.Models.Entities;
using Microsoft.EntityFrameworkCore;
using VectorXBackend.DTOs.Requests.VectorX.TakingCourses;

namespace VectorXBackend.Repositories.AccountService
{
    public class UserRepository : IUserRepository
    {
        private readonly VectorXContext _dbContext;

        public UserRepository(VectorXContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<User>> GetAllUsers()
        {
            return await _dbContext.Users.ToListAsync();
        }

        public async Task<User> GetUserByUsername(string username)
        {
            //Обновляем context, чтобы предупредить кэширование данных, если они извлекаются в цикле через Socket
            using (var dbContext = new VectorXContext())
            {
                return await dbContext.Users
                .FirstOrDefaultAsync(user => user.Username == username);
            }
        }

        public async Task<User> GetUserById(int userId)
        {
            //Обновляем context, чтобы предупредить кэширование данных, если они извлекаются в цикле через Socket
            using (var dbContext = new VectorXContext())
            {
                return await dbContext.Users
                    .AsNoTracking() // Использовать AsNoTracking() для предотвращения кэширования
                    .FirstOrDefaultAsync(user => user.UserId == userId);
            }
        }

        public async Task<User> GetUserByPassword(string password)
        {
            //Обновляем context, чтобы предупредить кэширование данных, если они извлекаются в цикле через Socket
            using (var dbContext = new VectorXContext())
            {
                return await dbContext.Users
                .FirstOrDefaultAsync(user => user.Password == password);
            }
        }

        public async Task AddUser(User user)
        {
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<User>> GetUsersByIds(int[] userIds)
        {
            return await _dbContext.Users
                .Where(user => userIds.Contains(user.UserId))
                .ToListAsync();
        }

        public async Task RedactUserData(TopUpBalanceDto topUpBalanceDto)
        {
            var user = await GetUserById(topUpBalanceDto.UserId); // Извлекаем пользователя по Id
            if (user != null)
            {
                user.Balance += topUpBalanceDto.Funds; // Увеличиваем баланс
                _dbContext.Users.Update(user); //Обновляем контекст базы данных
            }
            await _dbContext.SaveChangesAsync(); // Сохраняем изменения
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

                byte[] avatarBytes = null;

                // Преобразуем строку Base64 в массив байт
                try
                {
                    avatarBytes = Convert.FromBase64String(base64String);
                }
                catch { }

                user.Avatar = avatarBytes; // Присваиваем массив байт полю Avatar пользователя
                _dbContext.Users.Update(user); //Обновляем контекст базы данных
            }

            await _dbContext.SaveChangesAsync(); // Сохраняем изменения
        }

        public async Task RedactUserData(int userId, int userRoleId, string username)
        {
            var user = await GetUserById(userId); // Извлекаем пользователя по Id
            if (user != null)
            {
                user.Username = username; // Меняем Username
                user.RoleId = userRoleId; // Меняем RoleId
                _dbContext.Users.Update(user); //Обновляем контекст базы данных
            }
            await _dbContext.SaveChangesAsync(); // Сохраняем изменения
        }

        public async Task RedactUserBlockStatus(int userId, bool isBlock)
        {
            var user = await GetUserById(userId); // Извлекаем пользователя по Id
            if (user != null)
            {
                user.IsBlocked = isBlock; // Меняем BlockStatus
                _dbContext.Users.Update(user); //Обновляем контекст базы данных
            }
            await _dbContext.SaveChangesAsync(); // Сохраняем изменения
        }
    }
}
