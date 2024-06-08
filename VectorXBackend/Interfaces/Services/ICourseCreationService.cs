using VectorXBackend.DTOs.SharedDTOs;
using VectorXBackend.DTOs.Responses.VectorX.CourseManagement;

namespace VectorXBackend.Interfaces.Services
{
    public interface ICourseCreationService
    {
        Task<int> CreateCourse(CourseDto courseDto);
        Task<IEnumerable<SubjectsResponseDto>> GetAllSubjects();
        Task<CourseListDto> GetAuthorDrafts(UserIdDto useridDto);
        Task RedactCourse(CourseDto courseDto);
        Task DeleteCourse(CourseIdDto courseIdDto);
    }
}