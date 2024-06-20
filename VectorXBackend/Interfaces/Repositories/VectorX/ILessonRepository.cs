using VectorXBackend.Models.Entities;
using VectorXBackend.DTOs.Requests.VectorX.CourseManagement;

namespace VectorXBackend.Interfaces.Repositories.VectorX
{
    public interface ILessonRepository
    {
        Task<Lesson> GetLessonById(int lessonId);
        Task<Lesson> GetLessonByLastLessonId(int? lastLessonId);
        Task<int> AddLesson(Lesson lesson);
        Task<IEnumerable<Lesson>> GetLessonsBySectionId(int courseSectionId);
        Task RedactLesson(Lesson lesson);
        Task DeleteLesson(LessonIdDto lessonIdDto);
    }
}
