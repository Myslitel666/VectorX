using Microsoft.AspNetCore.Mvc;
using VectorXBackend.Interfaces.Services;
using VectorXBackend.DTOs.SharedDTOs;
using VectorXBackend.DTOs.Requests.AccountService;
using VectorXBackend.DTOs.Responses.AccountService;

namespace VectorXBackend.Controllers.AccountService
{
    [Route("api/adminPanel")]
    [ApiController]
    public class GetUsersController : Controller
    {
        private readonly IAccountService _accountService;

        public GetUsersController(IAccountService accountService)
        {
            _accountService = accountService ?? throw new ArgumentNullException(nameof(accountService));
        }

        [HttpGet("getUsers")]
        public async Task<IActionResult> GetUsers()
        {
            var usersDto = await _accountService.GetAllUsers();

            return Ok(usersDto);
        }

        [HttpPost("updateUser")]
        public async Task<IActionResult> RedactUserData([FromBody] UpdateUserDataDto updateUserDataDto)
        {
            var redactUserDataDto = await _accountService.UpdateUser(updateUserDataDto);

            return Ok(redactUserDataDto);
        }
    }
}
