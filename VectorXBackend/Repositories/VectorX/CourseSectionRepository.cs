using Microsoft.EntityFrameworkCore;
using VectorXBackend.Models.Entities;
using VectorXBackend.Interfaces.Repositories.VectorX;
using VectorXBackend.Context;

namespace VectorXBackend.Repositories.VectorX
{
    public class CourseSectionRepository : ICourseSectionRepository
    {
        private readonly VectorXContext _dbContext;

        public CourseSectionRepository(VectorXContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CourseSection> GetSectionById(int sectionId)
        {
            return await _dbContext.CourseSections
            .FirstOrDefaultAsync(cs => cs.CourseSectionId == sectionId);
        }

        public async Task<int> AddCourseSection(CourseSection section)
        {
            _dbContext.CourseSections.Add(section);
            await _dbContext.SaveChangesAsync();
            return section.CourseSectionId;
        }

        public async Task<IEnumerable<CourseSection>> GetSectionsByCourseId(int courseId)
        {
            return await _dbContext.CourseSections
                .Where(cs => cs.CourseId == courseId && cs.IsDeleted == false)
                .ToListAsync();
        }

        public async Task RedactCourseSection(CourseSection section)
        {
            _dbContext.CourseSections.Update(section); //Обновляем контекст базы данных

            await _dbContext.SaveChangesAsync(); // Сохраняем изменения
        }
    }
}
