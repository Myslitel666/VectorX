using VectorXBackend.Context;
using VectorXBackend.Interfaces.Repositories.VectorX;
using VectorXBackend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace VectorXBackend.Repositories.VectorX
{
    public class CourseStatusesRepository : ICourseStatusesRepository
    {
        private readonly VectorXContext _dbContext;

        public CourseStatusesRepository(VectorXContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CourseStatus> GetStatusByCourseId(int courseId)
        {
            return await _dbContext.CourseStatuses
                .FirstOrDefaultAsync(cs => cs.CourseId == courseId);
        }

        public async Task AddCourseStatus(CourseStatus courseStatus)
        {
            _dbContext.CourseStatuses.Add(courseStatus);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RedactCourseStatus(int courseId, int courseStatusId)
        {
            var courseStatus = await GetStatusByCourseId(courseId);
            if (courseStatus != null)
            {
                courseStatus.CourseStatuseId = courseStatusId; // Меняем Status
                _dbContext.CourseStatuses.Update(courseStatus); //Обновляем контекст базы данных
            }
            await _dbContext.SaveChangesAsync(); // Сохраняем изменения
        }
    }
}
