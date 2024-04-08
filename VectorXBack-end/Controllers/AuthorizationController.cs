using Microsoft.AspNetCore.Mvc;
using VectorXBackend.Interfaces.Services;
using VectorXBackend.DTOs.Requests.AccountService;

namespace VectorXBackend.Controllers
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
