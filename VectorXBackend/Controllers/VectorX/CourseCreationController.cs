using Microsoft.AspNetCore.Mvc;
using VectorXBackend.Context;
using VectorXBackend.DTOs.SharedDTOs;
using VectorXBackend.Interfaces.Repositories.VectorX;
using VectorXBackend.Interfaces.Services;
using VectorXBackend.DTOs.Requests.VectorX.CourseManagement;

namespace VectorXBackend.Controllers.VectorX
{
    [Route("api/vectorX/course-management")]
    [ApiController]
    public class CourseCreationController : Controller
    {
        private VectorXContext _dbContext;
        private readonly ICourseCreationService _courseCreationService;
        private readonly ICourseRepository _courseRepository;
        private readonly ICourseSectionRepository _courseSectionRepository;

        public CourseCreationController(
            ICourseCreationService courseManagementService,
            ICourseRepository courseRepository,
            ICourseSectionRepository courseSectionRepository
        )
        {
            _dbContext = new VectorXContext();
            _courseCreationService = courseManagementService;
            _courseRepository = courseRepository;
            _courseSectionRepository = courseSectionRepository;
        }

        [HttpGet("getSubjects")]
        public async Task<IActionResult> GetSubjects()
        {
            var subjects = await _courseCreationService.GetAllSubjects();
            return Ok(subjects);
        }
        [HttpPost("createCourse")]
        public async Task<IActionResult> CreateCourse([FromBody] CourseDto courseDto)
        {
            int courseId = await _courseCreationService.CreateCourse(courseDto);
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
            var courseListDto = await _courseCreationService.GetAuthorDrafts(userIdDto);
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
            await _courseCreationService.RedactCourse(courseDto);

            return Ok();
        }
        [HttpPost("deleteCourseById")]
        public async Task<IActionResult> DeleteCourseById([FromBody] CourseIdDto courseIdDto)
        {
            await _courseCreationService.DeleteCourse(courseIdDto);

            return Ok();
        }
        [HttpPost("getCourseSections")]
        public async Task<IActionResult> GetCourseSections([FromBody] CourseIdDto courseIdDto)
        {
            var courseSections = await _courseCreationService.GetCourseSectionsList(courseIdDto);

            return Ok(courseSections);
        }
        [HttpPost("createCourseSection")]
        public async Task<IActionResult> CreateCourseSection([FromBody] CourseIdDto courseIdDto)
        {
            var courseSectionId = await _courseCreationService.CreateCourseSection(courseIdDto);

            return Ok(courseSectionId);
        }
        [HttpPost("deleteCourseSection")]
        public async Task<IActionResult> DeleteCourseSection([FromBody] CourseSectionIdDto courseSectionIdDto)
        {
            await _courseCreationService.DeleteCourseSection(courseSectionIdDto);

            return Ok();
        }
        [HttpPost("redactCourseSection")]
        public async Task<IActionResult> RedactCourseSection([FromBody] CourseSectionRedactDto courseSectionRedactDto)
        {
            await _courseCreationService.RedactCourseSection(courseSectionRedactDto);

            return Ok();
        }
        [HttpPost("getLessons")]
        public async Task<IActionResult> GetLessons([FromBody] CourseSectionIdDto courseSectionIdDto)
        {
            var lessons = await _courseCreationService.GetLessonsList(courseSectionIdDto);

            return Ok(lessons);
        }
        [HttpPost("createLesson")]
        public async Task<IActionResult> CreateLesson([FromBody] CourseSectionIdDto courseSectionIdDto)
        {
            var lessonId = await _courseCreationService.CreateLesson(courseSectionIdDto);

            return Ok(lessonId);
        }
        [HttpPost("deleteLesson")]
        public async Task<IActionResult> DeleteLesson([FromBody] LessonIdDto lessonIdDto)
        {
            await _courseCreationService.DeleteLesson(lessonIdDto);

            return Ok();
        }
        [HttpPost("redactLesson")]
        public async Task<IActionResult> RedactLesson([FromBody] LessonRedactDto lessonRedactDto)
        {
            await _courseCreationService.RedactLesson(lessonRedactDto);

            return Ok();
        }
    }
}
