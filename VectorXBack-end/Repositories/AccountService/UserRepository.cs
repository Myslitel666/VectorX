﻿using VectorXBackend.Context;
using VectorXBackend.Interfaces.Repositories.AccountService;
using VectorXBackend.DTOs.Requests.AccountService;
using VectorXBackend.Models.Entities;
using Microsoft.EntityFrameworkCore;
using VectorXBackend.DTOs.Requests.EnglishAssistant;

namespace VectorXBackend.Repositories.AccountService
{
    public class UserRepository : IUserRepository
    {
        private readonly EnglishAssistantContext _dbContext;

        public UserRepository(EnglishAssistantContext dbContext)
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
            user.Username = usernameRedactDto.DesiredUsername; // Меняем Username
            await _dbContext.SaveChangesAsync(); // Сохраняем изменения
        }

        public async Task RedactUserData(PasswordRedactDto passwordRedactDto)
        {
            var user = await GetUserById(passwordRedactDto.UserId); // Извлекаем пользователя по Id
            user.Username = passwordRedactDto.DesiredPassword; // Меняем Password
            await _dbContext.SaveChangesAsync(); // Сохраняем изменения
        }
    }
}
