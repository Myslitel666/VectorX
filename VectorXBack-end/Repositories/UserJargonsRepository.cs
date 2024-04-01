using EnglishAssistantBackend.Context;
using EnglishAssistantBackend.DTOs.Requests;
using EnglishAssistantBackend.Interfaces.Repositories;
using EnglishAssistantBackend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace EnglishAssistantBackend.Repositories
{
    public class UserJargonsRepository : IUserJargonsRepository
    {
        private readonly EnglishAssistantContext _dbContext;

        public UserJargonsRepository(EnglishAssistantContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<string>> GetJargonsByUserId(int userId)
        {
            //Извлекаю список id слов пользователя
            var JargonIdsList = await GetJargonIdsByUserId(userId);

            var userJargonsList = new List<string>();

            foreach (var jargonId in JargonIdsList)
            {
                var jargon = _dbContext.Jargons
                  .Where(j => j.JargonId == jargonId)
                  .Select(j => j.JargonInstance)
                  .FirstOrDefault();

                if (jargon != null)
                {
                    userJargonsList.Add(jargon);
                }
            }

            return userJargonsList;
        }

        public async Task<IEnumerable<int>> GetJargonIdsByUserId(int userId)
        {
            //Создаю список id слов пользователя
            var JargonIdList = new List<int>();

            //Извлекаю список id слов пользователя из таблицы UserJargons
            JargonIdList = _dbContext.UserJargons
                  .Where(uj => uj.UserId == userId)
                  .Select(uj => uj.JargonId)
                  .ToList();

            return JargonIdList;
        }

        public async Task<UserJargon> GetUserJargon(int userId, int jargonId)
        {
            return await _dbContext.UserJargons.FirstOrDefaultAsync(
                userJargon => 
                userJargon.UserId == userId && 
                userJargon.JargonId == jargonId
            );
        }

        public async Task AddUserJargon(UserJargon userJargon)
        {
            _dbContext.UserJargons.Add(userJargon);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteUserJargon(int userId, int jargonId)
        {
            var userJargon = await GetUserJargon(userId, jargonId);
            if (userJargon != null)
            {
                _dbContext.UserJargons.Remove(userJargon);
            }
            await _dbContext.SaveChangesAsync();
        }
    }
}
