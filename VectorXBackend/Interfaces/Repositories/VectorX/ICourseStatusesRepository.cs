using VectorXBackend.Models.Entities;

namespace VectorXBackend.Interfaces.Repositories.VectorX
{
    public interface ICourseStatusesRepository
    {
        Task<CourseStatus> GetStatusByCourseId(int courseId);
        Task AddCourseStatus(CourseStatus courseStatus);
        Task RedactCourseStatus(int courseId, int courseStatusId);
    }
}
