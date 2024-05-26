using VectorXBackend.DTOs.SharedDTOs;
using VectorXBackend.DTOs.Requests.VectorX.TakingCourses;

namespace VectorXBackend.Interfaces.Services
{
    public interface ICourseManagementService
    {
        Task<ResponseBaseDto> CreateCourse(CourseDto courseDto);
    }
}