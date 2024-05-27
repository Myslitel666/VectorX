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

        public async Task<ResponseBaseDto> CreateCourse(CourseDto courseDto)
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
                Descriptrion = courseDto.Descriptrion,
                Price = courseDto.Price,
            };

            int courseId = await _courseRepository.AddCourse(course);
            var createdStatus = await _courseStatusDirectoryRepository.GetStatusByName("Created");
            var courseStatuses = new CourseStatus()
            {
                CourseId = courseId,
                CourseStatusId = createdStatus.CourseStatusId
            };
            await _courseStatusesRepository.AddCourseStatus(courseStatuses);

            var response = new ResponseBaseDto()
            {
                IsError = false,
                FeedbackMessage = "✓The course has been successfully created.",
            };
            return response;
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
    }
}
