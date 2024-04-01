using EnglishAssistantBackend.Models.Entities;

namespace EnglishAssistantBackend.Interfaces.Repositories
{
    public interface IRoleRepository
    {
        Task<Role> GetRoleById(int roleId);

        Task<Role> GetIdByRole(string role);
    }
}
