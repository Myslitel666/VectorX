using VectorXBackend.Models.Entities;

namespace VectorXBackend.Interfaces.Repositories.VectorX
{
    public interface ICourseStatusDirectoryRepository
    {
        Task<CourseStatusDirectory> GetStatusById(int courseStatusId);

        Task<CourseStatusDirectory> GetStatusByName(string statusName);
    }
}
