using VectorXBackend.Models.Entities;
using VectorXBackend.DTOs.Requests.VectorX.CourseManagement;

namespace VectorXBackend.Interfaces.Repositories.VectorX
{
    public interface ICourseSectionRepository
    {
        Task<CourseSection> GetSectionById(int sectionId);
        Task<CourseSection> GetSectionByLastSectionId(int? lastSectionId);
        Task<int> AddCourseSection(CourseSection section);
        Task<IEnumerable<CourseSection>> GetSectionsByCourseId(int courseId);
        Task RedactCourseSection(CourseSection section);
        Task DeleteCourseSection(CourseSectionIdDto courseSectionIdDto);
    }
}
