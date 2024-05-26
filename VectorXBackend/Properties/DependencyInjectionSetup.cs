using VectorXBackend.Context;
using VectorXBackend.Interfaces.Repositories;
using VectorXBackend.Interfaces.Repositories.AccountService;
using VectorXBackend.Interfaces.Repositories.EnglishAssistant;
using VectorXBackend.Interfaces.Repositories.VectorX;
using VectorXBackend.Interfaces.Services;
using VectorXBackend.Repositories;
using VectorXBackend.Repositories.AccountService;
using VectorXBackend.Repositories.EnglishAssistant;
using VectorXBackend.Repositories.VectorX;
using VectorXBackend.Services;
using Microsoft.EntityFrameworkCore;

namespace VectorXBackend.Properties
{
    public class DependencyInjectionSetup
    {
        public static void Configure(IServiceCollection services, string connectionString)
        {
            // Add database context
            services.AddDbContext<VectorXContext>(options =>
                options.UseSqlServer(connectionString));

            // Repositories
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<ICourseRepository, CourseRepository>();
            services.AddScoped<ISubjectRepository, SubjectRepository>();
            services.AddScoped<ICourseStatusesRepository, CourseStatusesRepository>();
            services.AddScoped<ICourseStatusDirectoryRepository, CourseStatusDirectoryRepository>();
            services.AddScoped<IUserJargonsRepository, UserJargonsRepository>();
            services.AddScoped<IJargonRepository, JargonRepository>();
            services.AddScoped<IContextRepository, ContextRepository>();

            // Services
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IEnglishAssistantService, EnglishAssistantService>();
            services.AddScoped<ICourseManagementService, CourseManagementService>();
            services.AddScoped<ITakingCoursesService, TakingCoursesService>();
            services.AddSingleton<IWebSocketService, WebSocketService>();
        }
    }
}
