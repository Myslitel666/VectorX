using VectorXBackend.Models.Entities;

namespace VectorXBackend.Interfaces.Repositories.AccountService
{
    public interface IRoleRepository
    {
        Task<Role> GetRoleById(int roleId);

        Task<Role> GetIdByRole(string role);
    }
}
