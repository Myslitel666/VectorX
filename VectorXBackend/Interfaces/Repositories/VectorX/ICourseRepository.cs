using VectorXBackend.Models.Entities;

namespace VectorXBackend.Interfaces.Repositories.VectorX
{
    public interface ICourseRepository
    {
        Task<Course> GetCourseById(int courseId);
        Task<List<Course>> GetCoursesByAuthorId(int authorId);
        Task<List<Course>> GetCoursesBySubjectId(int subjectId);
        Task<int> AddCourse(Course course);
        Task<List<Course>> GetCoursesByAuthorIdAndStatusId(int authorId, int statusId);
        Task RedactCourse(Course course);
    }
}
