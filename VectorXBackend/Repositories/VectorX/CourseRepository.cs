using VectorXBackend.Context;
using VectorXBackend.Interfaces.Repositories.VectorX;
using VectorXBackend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace VectorXBackend.Repositories.VectorX
{
    public class CourseRepository : ICourseRepository
    {
        private readonly VectorXContext _dbContext;

        public CourseRepository(VectorXContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Course> GetCourseById(int courseId)
        {
            return await _dbContext.Courses
            .FirstOrDefaultAsync(course => course.CourseId == courseId);
        }

        public async Task AddCourse(Course course)
        {
            _dbContext.Courses.Add(course);
            await _dbContext.SaveChangesAsync();
        }
    }
}
