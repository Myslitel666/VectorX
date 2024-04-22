using Microsoft.AspNetCore.Mvc;
using VectorXBackend.Interfaces.Services;
using VectorXBackend.DTOs.Requests.AccountService;

namespace VectorXBackend.Controllers.AccountService
{
    [Route("api/verification")]
    [ApiController]
    public class VerificationController : Controller
    {
        private readonly IAccountService _accountService;

        public VerificationController(IAccountService accountService)
        {
            _accountService = accountService ?? throw new ArgumentNullException(nameof(accountService));
        }

        [HttpPost("verifyUser")]
        public async Task<IActionResult> VerifyUser([FromBody] VerifyUserDto verifyUserDto)
        {
            var verificationResponse = await _accountService.VerifyUser(verifyUserDto);

            return Ok(verificationResponse);
        }
    }
}
