using Microsoft.AspNetCore.Mvc;
using VectorXBackend.Context;
using VectorXBackend.DTOs.SharedDTOs;
using VectorXBackend.Interfaces.Repositories.VectorX;
using VectorXBackend.Interfaces.Services;

namespace VectorXBackend.Controllers.VectorX
{
    [Route("api/vectorX/course-management")]
    [ApiController]
    public class CourseCreationController : Controller
    {
        private VectorXContext _dbContext;
        private readonly ICourseCreationService _courseManagementService;
        private readonly ICourseRepository _courseRepository;

        public CourseCreationController(
            ICourseCreationService courseManagementService,
            ICourseRepository courseRepository
        )
        {
            _dbContext = new VectorXContext();
            _courseManagementService = courseManagementService;
            _courseRepository = courseRepository;
        }

        [HttpGet("getSubjects")]
        public async Task<IActionResult> GetSubjects()
        {
            var subjects = await _courseManagementService.GetAllSubjects();
            return Ok(subjects);
        }
        [HttpPost("createCourse")]
        public async Task<IActionResult> CreateCourse([FromBody] CourseDto courseDto)
        {
            int courseId = await _courseManagementService.CreateCourse(courseDto);
            return Ok(
                new CourseIdDto()
                {
                    CourseId = courseId,
                }
            );
        }
        [HttpPost("getAuthorDrafts")]
        public async Task<IActionResult> GetAuthorDrafts([FromBody] UserIdDto userIdDto)
        {
            var courseListDto = await _courseManagementService.GetAuthorDrafts(userIdDto);
            return Ok(courseListDto);
        }
        [HttpPost("getCourseById")]
        public async Task<IActionResult> GetCourseById([FromBody] CourseIdDto courseIdDto)
        {
            var course = await _courseRepository.GetCourseById(courseIdDto.CourseId);

            return Ok(
                new CourseDto()
                {
                    CourseId = course.CourseId,
                    AuthorId = course.AuthorId,
                    SubjectId = course.SubjectId,
                    Title = course.Title,
                    CourseAvatar = Convert.ToBase64String(course.CourseAvatar),
                    Description = course.Descriptrion,
                    Price = course.Price,
                }
            );
        }
        [HttpPost("redactCourse")]
        public async Task<IActionResult> RedactCourse([FromBody] CourseDto courseDto)
        {
            await _courseManagementService.RedactCourse(courseDto);

            return Ok();
        }
        [HttpPost("deleteCourseById")]
        public async Task<IActionResult> DeleteCourseById([FromBody] CourseIdDto courseIdDto)
        {
            await _courseManagementService.DeleteCourse(courseIdDto);

            return Ok();
        }
    }
}
