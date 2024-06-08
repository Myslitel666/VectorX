using VectorXBackend.Context;
using VectorXBackend.Interfaces.Repositories.VectorX;
using VectorXBackend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace VectorXBackend.Repositories.VectorX
{
    public class SectionCourseRepository
    {
        private readonly VectorXContext _dbContext;

        public SectionCourseRepository(VectorXContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddSectionCourse(CourseStatus courseStatus)
        {
            _dbContext.CourseStatuses.Add(courseStatus);
            await _dbContext.SaveChangesAsync();
        }
    }
}
