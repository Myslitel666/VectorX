using Microsoft.AspNetCore.Mvc;
using VectorXBackend.Context;
using VectorXBackend.DTOs.Requests.AccountService;
using VectorXBackend.DTOs.Requests.EnglishAssistant;
using VectorXBackend.Interfaces.Services;

namespace VectorXBackend.Controllers.EnglishAssistant
{
    [Route("api/english-assistant/home")]
    [ApiController]
    public class EnglishAssistantController : Controller
    {
        private EnglishAssistantContext _dbContext;
        private readonly IEnglishAssistantService _jargonDictionaryService;

        public EnglishAssistantController(IEnglishAssistantService jargonDictionaryService)
        {
            _dbContext = new EnglishAssistantContext();
            _jargonDictionaryService = jargonDictionaryService;
        }

        [HttpPost("getUserJargons")]
        public async Task<IActionResult> GetUserJargons([FromBody] UserDto userDto)
        {
            var jargonEntries = await _jargonDictionaryService.GetUserJargons(userDto.UserId);
            return Ok(jargonEntries);
        }

        [HttpPost("setJargon")]
        public async Task<IActionResult> SendJargon([FromBody] JargonDto jargonDto)
        {
            var response = await _jargonDictionaryService.AddJargon(jargonDto);

            return Ok(response);
        }

        [HttpPost("modifyJargon")]
        public async Task<IActionResult> ModifyJargon([FromBody] JargonDto jargonDto)
        {
            var jargonResponseDto = await _jargonDictionaryService.ModifyJargon(jargonDto);

            return Ok(jargonResponseDto);
        }

        [HttpPost("deleteJargon")]
        public async Task<IActionResult> DeleteJargon([FromBody] JargonDto jargonDto)
        {
            var jargonResponseDto = await _jargonDictionaryService.DeleteJargon(jargonDto);

            return Ok(jargonResponseDto);
        }
    }
}
