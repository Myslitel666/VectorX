using EnglishAssistantBackend.Context;
using EnglishAssistantBackend.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EnglishAssistantBackend.Repositories;
using EnglishAssistantBackend.Interfaces.Repositories;
using EnglishAssistantBackend.Interfaces.Services;
using EnglishAssistantBackend.DTOs.Requests;

namespace EnglishAssistantBackend.Controllers
{
    [Route("api/reg")]
    [ApiController]
    public class RegistrationController : Controller
    {
        private readonly IAccountService _accountService;

        public RegistrationController(IAccountService accountService)
        {
            _accountService = accountService ?? throw new ArgumentNullException(nameof(accountService));
        }

        [HttpPost("setUser")]
        public async Task<IActionResult> SetUser([FromBody] UserDto userDto)
        {
            var authorizationResponse = await _accountService.RegisterUser(userDto);

            return Ok(authorizationResponse);
        }
    }
}
