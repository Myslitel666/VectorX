using EnglishAssistantBackend.Context;
using EnglishAssistantBackend.Interfaces.Repositories;
using EnglishAssistantBackend.Interfaces.Services;
using EnglishAssistantBackend.Repositories;
using EnglishAssistantBackend.Services;
using Microsoft.EntityFrameworkCore;

namespace EnglishAssistantBackend.Properties
{
    public class DependencyInjectionSetup
    {
        public static void Configure(IServiceCollection services, string connectionString)
        {
            // Add database context
            services.AddDbContext<EnglishAssistantContext>(options =>
                options.UseSqlServer(connectionString));

            // Repositories
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IUserJargonsRepository, UserJargonsRepository>();
            services.AddScoped<IJargonRepository, JargonRepository>();
            services.AddScoped<IContextRepository, ContextRepository>();

            // Services
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IJargonDictionaryService, JargonDictionaryService>();
        }
    }
}
