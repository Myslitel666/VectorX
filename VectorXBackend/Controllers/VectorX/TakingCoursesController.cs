using Microsoft.AspNetCore.Mvc;
using VectorXBackend.Context;
using VectorXBackend.DTOs.Requests.VectorX.TakingCourses;
using VectorXBackend.DTOs.SharedDTOs;
using VectorXBackend.Interfaces.Services;

namespace VectorXBackend.Controllers.VectorX
{
    [Route("api/vectorX/taking-courses")]
    [ApiController]
    public class TakingCoursesController : Controller
    {
        private VectorXContext _dbContext;
        private readonly ITakingCoursesService _takingCoursesService;

        public TakingCoursesController(ITakingCoursesService takingCoursesService)
        {
            _dbContext = new VectorXContext();
            _takingCoursesService = takingCoursesService;
        }

        [HttpPost("topUpFunds")]
        public async Task<IActionResult> TopUpFunds([FromBody] TopUpBalanceDto topUpBalanceDto)
        {
            var topUpBalanceResponse = await _takingCoursesService.TopUpFunds(topUpBalanceDto);
            return Ok(topUpBalanceResponse);
        }
    }
}
