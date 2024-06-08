using Microsoft.EntityFrameworkCore;
using VectorXBackend.Context;
using VectorXBackend.Interfaces.Repositories.VectorX;
using VectorXBackend.Models.Entities;

namespace VectorXBackend.Repositories.VectorX
{
    public class CourseSectionRepository
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

        public async Task<List<CourseSection>> GetSectionsByCourseId(int courseId)
        {
            return await _dbContext.CourseSections
                .Where(cs => cs.CourseId == courseId)
                .ToListAsync();
        }

        public async Task RedactCourseSection(CourseSection section)
        {
            _dbContext.CourseSections.Update(section); //Обновляем контекст базы данных

            await _dbContext.SaveChangesAsync(); // Сохраняем изменения
        }
    }
}
