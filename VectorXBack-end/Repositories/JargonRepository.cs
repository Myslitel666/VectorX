using EnglishAssistantBackend.Context;
using EnglishAssistantBackend.DTOs.Requests;
using EnglishAssistantBackend.Interfaces.Repositories;
using EnglishAssistantBackend.Models.Entities;
using Microsoft.EntityFrameworkCore;
using EnglishAssistantBackend.Repositories;

namespace EnglishAssistantBackend.Repositories
{
    public class JargonRepository : IJargonRepository
    {
        private readonly EnglishAssistantContext _dbContext;

        public JargonRepository(EnglishAssistantContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Jargon> GetJargonById(int jargonId)
        {
            return await _dbContext.Jargons
                .FirstOrDefaultAsync(jargon => jargon.JargonId == jargonId);
        }

        public async Task<IEnumerable<Jargon>> GetUserJargons(IEnumerable<int> jargonIds)
        {
            var userJargonsList = new List<Jargon>();

            foreach (var jargonId in jargonIds)
            {
                var jargon = await _dbContext.Jargons
                  .FirstOrDefaultAsync(j => j.JargonId == jargonId);

                if (jargon != null)
                {
                    userJargonsList.Add(jargon);
                }
            }

            return userJargonsList;
        }

        public async Task<int> AddJargon(Jargon jargon)
        {
            _dbContext.Jargons.Add(jargon);
            await _dbContext.SaveChangesAsync();

            // Получаем идентификатор добавленного объекта
            var jargonId = jargon.JargonId;

            return jargonId;
        }

        public async Task ModifyJargon(JargonDto jargonDto)
        {
            var jargon = await GetJargonById(jargonDto.JargonId);

            if (jargon != null)
            {
                jargon.JargonInstance = jargonDto.JargonInstance;
                jargon.Translate = jargonDto.Translate;
                jargon.ExampleOfUse = jargonDto.ExampleOfUse;

                _dbContext.Jargons.Update(jargon);
            }

            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteJargon(int jargonId)
        {
            var jargon = await GetJargonById(jargonId);

            if (jargon != null)
            {
                _dbContext.Jargons.Remove(jargon);
            }

            await _dbContext.SaveChangesAsync();
        }
    }
}
