using VectorXBackend.Context;
using VectorXBackend.Interfaces.Repositories.VectorX;
using VectorXBackend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace VectorXBackend.Repositories.VectorX
{
    public class CourseStatusDirectoryRepository : ICourseStatusDirectoryRepository
    {
        private readonly VectorXContext _dbContext;

        public CourseStatusDirectoryRepository(VectorXContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CourseStatusDirectory> GetStatusById(int courseStatusId)
        {
            return await _dbContext.CourseStatusDirectories
                .FirstOrDefaultAsync(status => status.CourseStatusId == courseStatusId);
        }

        public async Task<CourseStatusDirectory> GetStatusByName(string statusName)
        {
            return await _dbContext.CourseStatusDirectories
                .FirstOrDefaultAsync(status => status.StatusName == statusName);
        }
    }
}
