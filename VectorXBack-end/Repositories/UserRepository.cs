using EnglishAssistantBackend.Context;
using EnglishAssistantBackend.Interfaces.Repositories;
using EnglishAssistantBackend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace EnglishAssistantBackend.Repositories
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

    }
}
