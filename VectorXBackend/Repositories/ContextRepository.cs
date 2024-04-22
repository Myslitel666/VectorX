using VectorXBackend.Context;
using VectorXBackend.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace VectorXBackend.Repositories
{
    public class ContextRepository : IContextRepository
    {
        private readonly VectorXContext _dbContext;

        public ContextRepository(VectorXContext dbContext)
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
