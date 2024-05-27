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

        public async Task<List<Course>> GetCoursesByAuthorId(int authorId)
        {
            return await _dbContext.Courses
                .Where(course => course.AuthorId == authorId)
                .ToListAsync();
        }

        public async Task<List<Course>> GetCoursesBySubjectId(int subjectId)
        {
            return await _dbContext.Courses
                .Where(course => course.SubjectId == subjectId)
                .ToListAsync();
        }

        public async Task<int> AddCourse(Course course)
        {
            _dbContext.Courses.Add(course);
            await _dbContext.SaveChangesAsync();
            return course.CourseId;
        }

        public async Task<List<Course>> GetCoursesByAuthorIdAndStatusId(int authorId, int statusId)
        {
            return await _dbContext.Courses
                .Where(course => course.AuthorId == authorId && course.CourseStatuses.Any(cs => cs.CourseStatusId == statusId)) // фильтруем по authorId и statusId
                .Include(course => course.CourseStatuses) // включаем связанные данные о статусах курса
                .ToListAsync();
        }
    }
}
