using VectorXBackend.Models.Entities;

namespace VectorXBackend.Interfaces.Repositories.AccountService
{
    public interface IRoleRepository
    {
        Task<List<Role>> GetAllRoles();
        Task<Role> GetRoleById(int roleId);

        Task<Role> GetIdByRole(string role);

        Task<List<Role>> GetRolesByIds(int[] roleIds);
    }
}
