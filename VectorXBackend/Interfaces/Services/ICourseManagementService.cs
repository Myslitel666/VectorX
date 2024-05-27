using VectorXBackend.DTOs.SharedDTOs;
using VectorXBackend.DTOs.Responses.VectorX.CourseManagement;

namespace VectorXBackend.Interfaces.Services
{
    public interface ICourseManagementService
    {
        Task<ResponseBaseDto> CreateCourse(CourseDto courseDto);

        Task<IEnumerable<SubjectsResponseDto>> GetAllSubjects();
        Task<CourseListDto> GetAuthorDrafts(UserIdDto useridDto);
    }
}