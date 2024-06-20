using Microsoft.EntityFrameworkCore;
using VectorXBackend.Models.Entities;
using VectorXBackend.Interfaces.Repositories.VectorX;
using VectorXBackend.Context;
using VectorXBackend.DTOs.Requests.VectorX.CourseManagement;

namespace VectorXBackend.Repositories.VectorX
{
    public class LessonRepository : ILessonRepository
    {
        private readonly VectorXContext _dbContext;

        public LessonRepository(VectorXContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Lesson> GetLessonById(int lessonId)
        {
            return await _dbContext.Lessons
            .FirstOrDefaultAsync(l => l.LessonId == lessonId);
        }

        public async Task<Lesson> GetLessonByLastLessonId(int? lastLessonId)
        {
            return await _dbContext.Lessons
            .FirstOrDefaultAsync(l => l.LastLessonId == lastLessonId && l.IsDeleted == false);
        }

        public async Task<int> AddLesson(Lesson lesson)
        {
            _dbContext.Lessons.Add(lesson);
            await _dbContext.SaveChangesAsync();
            return lesson.LessonId;
        }

        public async Task<IEnumerable<Lesson>> GetLessonsBySectionId(int courseSectionId)
        {
            return await _dbContext.Lessons
                .Where(l => l.SectionCourseId == courseSectionId && l.IsDeleted == false)
                .ToListAsync();
        }

        public async Task RedactLesson(Lesson lesson)
        {
            _dbContext.Lessons.Update(lesson); //Обновляем контекст базы данных

            await _dbContext.SaveChangesAsync(); // Сохраняем изменения
        }

        public async Task DeleteLesson(LessonIdDto lessonIdDto)
        {
            var lessonId = lessonIdDto.LessonId;
            var lesson = await GetLessonById(lessonId);
            if (lesson != null)
            {
                _dbContext.Lessons.Remove(lesson);
            }
            await _dbContext.SaveChangesAsync();
        }
    }
}
