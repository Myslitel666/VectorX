using VectorXBackend.Models.Entities;

namespace VectorXBackend.Interfaces.Repositories.VectorX
{
    public interface ISubjectRepository
    {
        Task<IEnumerable<SubjectDirectory>> GetAllSubjects();
    }
}
