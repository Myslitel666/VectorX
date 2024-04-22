using Microsoft.AspNetCore.Mvc;
using VectorXBackend.Interfaces.Services;
using VectorXBackend.DTOs.SharedDTOs;

namespace VectorXBackend.Controllers.AccountService
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
