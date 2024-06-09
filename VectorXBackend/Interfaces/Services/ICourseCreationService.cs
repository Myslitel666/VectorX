using VectorXBackend.DTOs.SharedDTOs;
using VectorXBackend.DTOs.Responses.VectorX.CourseManagement;
using VectorXBackend.Models.Entities;
using VectorXBackend.DTOs.Requests.VectorX.CourseManagement;

namespace VectorXBackend.Interfaces.Services
{
    public interface ICourseCreationService
    {
        Task<int> CreateCourse(CourseDto courseDto);
        Task<IEnumerable<SubjectsResponseDto>> GetAllSubjects();
        Task<CourseListDto> GetAuthorDrafts(UserIdDto useridDto);
        Task RedactCourse(CourseDto courseDto);
        Task DeleteCourse(CourseIdDto courseIdDto);
        Task<IEnumerable<CourseSection>> GetCourseSectionsList(CourseIdDto courseIdDto);
        Task<int> CreateCourseSection(CourseIdDto courseIdDto);
        Task DeleteCourseSection(CourseSectionIdDto courseSectionIdDto);
    }
}