using VectorXBackend.Models.Entities;

namespace VectorXBackend.Interfaces.Repositories.VectorX
{
    public interface ICourseRepository
    {
        Task<Course> GetCourseById(int courseId);
        Task<int> AddCourse(Course course);
    }
}
