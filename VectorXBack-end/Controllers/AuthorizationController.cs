using EnglishAssistantBackend.Context;
using EnglishAssistantBackend.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EnglishAssistantBackend.Repositories;
using EnglishAssistantBackend.Interfaces.Services;
using EnglishAssistantBackend.DTOs.Requests;

namespace EnglishAssistantBackend.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthorizationController : Controller
    {
        private readonly IAccountService _accountService;

        public AuthorizationController(IAccountService accountService)
        {
            _accountService = accountService ?? throw new ArgumentNullException(nameof(accountService));
        }

        [HttpPost("findUser")]
        public async Task<IActionResult> FindUser([FromBody] UserDto userDto)
        {
            var authorizationResponse = await _accountService.AuthorizeUser(userDto);

            return Ok(authorizationResponse);
        }
    }
}
