using Microsoft.AspNetCore.Mvc;
using VectorXBackend.Interfaces.Services;
using VectorXBackend.DTOs.Requests.AccountService;

namespace VectorXBackend.Controllers.AccountService
{
    [Route("api/adminPanel")]
    [ApiController]
    public class AdminPanelController : Controller
    {
        private readonly IAccountService _accountService;

        public AdminPanelController(IAccountService accountService)
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

        [HttpPost("blockUser")]
        public async Task<IActionResult> BlockUser([FromBody] BlockUserDto blockUserDto)
        {
            var redactUserDataDto = await _accountService.BlockUser(blockUserDto.UserId);

            return Ok(redactUserDataDto);
        }

        [HttpPost("unblockUser")]
        public async Task<IActionResult> UnblockUser([FromBody] BlockUserDto blockUserDto)
        {
            var redactUserDataDto = await _accountService.UnblockUser(blockUserDto.UserId);

            return Ok(redactUserDataDto);
        }
    }
}
