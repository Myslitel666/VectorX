using VectorXBackend.Interfaces.Repositories.VectorX;
using VectorXBackend.Interfaces.Services;
using VectorXBackend.DTOs.Responses.VectorX.CourseManagement;
using VectorXBackend.DTOs.SharedDTOs;
using VectorXBackend.Models.Entities;
using VectorXBackend.Repositories.VectorX;

namespace VectorXBackend.Services
{
    public class CourseManagementService : ICourseManagementService
    {
        private readonly ICourseRepository _courseRepository;
        private readonly ISubjectRepository _subjectRepository;
        private readonly ICourseStatusDirectoryRepository _courseStatusDirectoryRepository;
        private readonly ICourseStatusesRepository _courseStatusesRepository;
        private async Task<Course> ConvertToCourse(CourseDto courseDto)
        {
            //Преобразуем аватар курса из строки в массив байт
            string base64String = courseDto.CourseAvatar.Replace("data:image/png;base64,", "");
            var avatarBytes = Convert.FromBase64String(base64String);

            var course = new Course
            {
                AuthorId = courseDto.AuthorId,
                SubjectId = courseDto.SubjectId,
                Title = courseDto.Title,
                CourseAvatar = avatarBytes,
                Descriptrion = courseDto.Description,
                Price = courseDto.Price,
            };

            return course;
        }

        public CourseManagementService(
            ICourseRepository courseRepository,
            ISubjectRepository subjectRepository,
            ICourseStatusDirectoryRepository courseStatusDirectoryRepository,
            ICourseStatusesRepository courseStatusesRepository
        )
        {
            _courseRepository = courseRepository;
            _subjectRepository = subjectRepository;
            _courseStatusDirectoryRepository = courseStatusDirectoryRepository;
            _courseStatusesRepository = courseStatusesRepository;
        }

        public async Task<int> CreateCourse(CourseDto courseDto)
        {
            var course = await ConvertToCourse(courseDto);

            int courseId = await _courseRepository.AddCourse(course);
            var createdStatus = await _courseStatusDirectoryRepository.GetStatusByName("Created");
            var courseStatuses = new CourseStatus()
            {
                CourseId = courseId,
                CourseStatusId = createdStatus.CourseStatusId
            };
            await _courseStatusesRepository.AddCourseStatus(courseStatuses);

            return courseId;
        }
        public async Task<IEnumerable<SubjectsResponseDto>> GetAllSubjects()
        {
            var subjectDirectories = await _subjectRepository.GetAllSubjects();
            var subjectsResponseDto = new List<SubjectsResponseDto>();

            foreach (var subjectDirectory in subjectDirectories)
            {
                subjectsResponseDto.Add(
                    new SubjectsResponseDto()
                    {
                        SubjectId = subjectDirectory.SubjectId,
                        SubjectName = subjectDirectory.SubjectName,
                        SubjectDescription = subjectDirectory.SubjectDescription,
                    }
                );
            }

            return subjectsResponseDto;
        }

        public async Task<CourseListDto> GetAuthorDrafts(UserIdDto userIdDto)
        {
            var createdStatus = await _courseStatusDirectoryRepository.GetStatusByName("Created");
            var authorDrafts = await _courseRepository.GetCoursesByAuthorIdAndStatusId(userIdDto.UserId, createdStatus.CourseStatusId);
            var courseDtoList = new List<CourseDto>();

            foreach (var authorDraft in authorDrafts)
            {
                courseDtoList.Add(
                    new CourseDto()
                    {
                        CourseId = authorDraft.CourseId,
                        AuthorId = authorDraft.AuthorId,
                        SubjectId = authorDraft.SubjectId,
                        Title = authorDraft.Title,
                        CourseAvatar = Convert.ToBase64String(authorDraft.CourseAvatar),
                        Description = authorDraft.Descriptrion,
                        Price = authorDraft.Price,
                    }
                );
            }

            var courseListDto = new CourseListDto
            {
                CourseDtoList = courseDtoList
            };

            return courseListDto;
        }
        public async Task RedactCourse(CourseDto courseDto)
        {
            var course = await ConvertToCourse(courseDto);
            course.CourseId = courseDto.CourseId;

            await _courseRepository.RedactCourse(course);
        }
        public async Task DeleteCourse(CourseIdDto courseIdDto)
        {
            int courseId = courseIdDto.CourseId;
            var deletedStatus = await _courseStatusDirectoryRepository.GetStatusByName("Deleted");

            await _courseStatusesRepository.RedactCourseStatus(courseId, deletedStatus.CourseStatusId);
        }
    }
}
