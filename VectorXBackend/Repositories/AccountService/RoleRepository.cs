using VectorXBackend.Context;
using VectorXBackend.Interfaces.Repositories.AccountService;
using VectorXBackend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace VectorXBackend.Repositories.AccountService
{
    public class RoleRepository : IRoleRepository
    {
        private readonly VectorXContext _dbContext;

        public RoleRepository(VectorXContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Role> GetIdByRole(string roleName)
        {
            return await _dbContext.Roles
            .FirstOrDefaultAsync(role => role.RoleName == roleName);
        }

        public async Task<Role> GetRoleById(int roleId)
        {
            return await _dbContext.Roles
            .FirstOrDefaultAsync(role => role.RoleId == roleId);
        }

        public async Task<List<Role>> GetRolesByIds(int[] roleIds)
        {
            return await _dbContext.Roles
                .Where(role => roleIds.Contains(role.RoleId))
                .ToListAsync();
        }
    }
}
