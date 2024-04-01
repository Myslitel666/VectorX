using EnglishAssistantBackend.Models.Entities;

namespace EnglishAssistantBackend.Interfaces.Repositories
{
    public interface IContextRepository
    {
        Task DetachEntity<T>(T entity) where T : class;
    }
}
