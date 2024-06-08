using VectorXBackend.Models.Entities;

namespace VectorXBackend.Interfaces.Repositories.VectorX
{
    public interface ICourseSectionRepository
    {
        Task<CourseSection> GetSectionById(int sectionId);
        Task<int> AddCourseSection(CourseSection section);
        Task<IEnumerable<CourseSection>> GetSectionsByCourseId(int courseId);
        Task RedactCourseSection(CourseSection section);
    }
}
