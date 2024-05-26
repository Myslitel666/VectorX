using Microsoft.AspNetCore.Mvc;
using VectorXBackend.Context;
using VectorXBackend.DTOs.SharedDTOs;
using VectorXBackend.Interfaces.Services;
using VectorXBackend.Interfaces.Repositories.VectorX;

namespace VectorXBackend.Controllers.VectorX
{
    [Route("api/vectorX/course-management")]
    [ApiController]
    public class CourseManagementController : Controller
    {
        private VectorXContext _dbContext;
        private readonly ICourseManagementService _courseManagementService;
        private readonly ISubjectRepository _subjectRepository;

        public CourseManagementController(ICourseManagementService courseManagementService)
        {
            _dbContext = new VectorXContext();
            _courseManagementService = courseManagementService;
        }

        [HttpGet("getSubjects")]
        public async Task<IActionResult> GetSubjects()
        {
            var subjects = await _subjectRepository.GetAllSubjects();
            return Ok(subjects);
        }
        [HttpPost("createCourse")]
        public async Task<IActionResult> CreateCourse([FromBody] CourseDto courseDto)
        {
            var createCourseResponse = await _courseManagementService.CreateCourse(courseDto);
            return Ok(createCourseResponse);
        }
    }
}
