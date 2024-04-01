using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EnglishAssistantBackend.Context;
using EnglishAssistantBackend.Models.Entities;
using EnglishAssistantBackend.DTOs.Requests;
using EnglishAssistantBackend.Interfaces.Services;
using EnglishAssistantBackend.Interfaces.Repositories;
using EnglishAssistantBackend.Repositories;

namespace EnglishAssistantBackend.Controllers
{
    [Route("api/english-assistant/home")]
    [ApiController]
    public class HomeController : Controller
    {
        private EnglishAssistantContext _dbContext;
        private readonly IJargonDictionaryService _jargonDictionaryService;

        public HomeController(IJargonDictionaryService jargonDictionaryService)
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
