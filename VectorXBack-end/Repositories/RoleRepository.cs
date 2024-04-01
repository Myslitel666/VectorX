using EnglishAssistantBackend.Context;
using EnglishAssistantBackend.Interfaces.Repositories;
using EnglishAssistantBackend.Models;
using EnglishAssistantBackend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace EnglishAssistantBackend.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly EnglishAssistantContext _dbContext;

        public RoleRepository(EnglishAssistantContext dbContext)
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
    }
}
