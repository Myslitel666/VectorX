using Microsoft.AspNetCore.Mvc;
using VectorXBackend.Interfaces.Services;
using VectorXBackend.DTOs.SharedDTOs;
using VectorXBackend.DTOs.Requests.AccountService;
using VectorXBackend.DTOs.Responses.AccountService;

namespace VectorXBackend.Controllers.AccountService
{
    [Route("api/auth")]
    [ApiController]
    public class CachedUsersController : Controller
    {
        private readonly IAccountService _accountService;

        public CachedUsersController(IAccountService accountService)
        {
            _accountService = accountService ?? throw new ArgumentNullException(nameof(accountService));
        }

        [HttpPost("getCachedUsers")]
        public async Task<IActionResult> GetCachedUsers([FromBody] CachedUserIdsDto cachedUserIdsDto)
        {
            var cachedUsersDto = await _accountService.GetCachedUsers(cachedUserIdsDto);

            return Ok(cachedUsersDto);
        }
    }
}
