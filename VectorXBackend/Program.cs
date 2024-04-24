using Microsoft.EntityFrameworkCore;
using VectorXBackend.Properties;
using VectorXBackend.Hubs;

var builder = WebApplication.CreateBuilder(args);

//Dependency Injection
DependencyInjectionSetup.Configure(
    builder.Services, 
    builder.Configuration.GetConnectionString("DefaultConnection")
);

// Add services to the container.
builder.Services.AddControllers();

//CORS
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins, policy =>
    {
        policy.WithOrigins().AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});


builder.Services.AddSignalR();

var app = builder.Build();

app.UseDefaultFiles(); //For SignalR
app.UseStaticFiles(); //For SignalR
app.MapHub<ChatHub>("/hub");

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseWebSockets();
app.UseCors(MyAllowSpecificOrigins); //Use CORS
app.MapControllers();
app.Run();