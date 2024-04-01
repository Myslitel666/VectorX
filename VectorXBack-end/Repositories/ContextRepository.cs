using EnglishAssistantBackend.Context;
using EnglishAssistantBackend.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace EnglishAssistantBackend.Repositories
{
    public class ContextRepository : IContextRepository
    {
        private readonly EnglishAssistantContext _dbContext;

        public ContextRepository(EnglishAssistantContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task DetachEntity<T>(T entity) where T : class
        {
            var entry = _dbContext.Entry(entity);
            if (entry != null)
            {
                entry.State = EntityState.Detached;
            }
        }
    }
}
