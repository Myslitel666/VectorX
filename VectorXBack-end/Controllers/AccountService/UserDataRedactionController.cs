using Microsoft.AspNetCore.Mvc;
using VectorXBackend.Interfaces.Services;
using VectorXBackend.DTOs.Requests.AccountService;

namespace VectorXBackend.Controllers.AccountService
{
    [Route("api/userDataRedaction")]
    [ApiController]
    public class UserDataRedactionController : Controller
    {
        private readonly IAccountService _accountService;

        public UserDataRedactionController(IAccountService accountService)
        {
            _accountService = accountService ?? throw new ArgumentNullException(nameof(accountService));
        }

        [HttpPost("redactUsername")]
        public async Task<IActionResult> RedactUsername([FromBody] UsernameRedactDto usernameRedactDto)
        {
            var userDataRedactDto = await _accountService.RedactUserData(usernameRedactDto);

            return Ok(userDataRedactDto);
        }

        [HttpPost("redactPassword")]
        public async Task<IActionResult> RedactPassword([FromBody] PasswordRedactDto passwordRedactDto)
        {
            var userDataRedactDto = await _accountService.RedactUserData(passwordRedactDto);

            return Ok(userDataRedactDto);
        }
    }
}
