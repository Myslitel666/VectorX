using VectorXBackend.Context;
using VectorXBackend.Interfaces.Repositories.VectorX;
using VectorXBackend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace VectorXBackend.Repositories.VectorX
{
    public class SubjectRepository : ISubjectRepository
    {
        private readonly VectorXContext _dbContext;

        public SubjectRepository(VectorXContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<SubjectDirectory>> GetAllSubjects()
        {
            return await _dbContext.SubjectDirectories.ToListAsync();
        }
    }
}
