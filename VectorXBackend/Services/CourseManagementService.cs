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

        public CourseManagementService(
            ICourseRepository courseRepository,
            ISubjectRepository subjectRepository
        )
        {
            _courseRepository = courseRepository;
            _subjectRepository = subjectRepository;
        }

        public async Task<ResponseBaseDto> CreateCourse(CourseDto courseDto)
        {
            try
            {
                //Преобразуем аватар курса из строки в массив байт
                string base64String = courseDto.CourseAvatar.Replace("data:image/png;base64,", "");
                var avatarBytes = Convert.FromBase64String(base64String);

                var course = new Course
                {
                    CourseId = courseDto.CourseId,
                    AuthorId = courseDto.AuthorId,
                    SubjectId = courseDto.SubjectId,
                    Title = courseDto.Title,
                    CourseAvatar = avatarBytes,
                    Descriptrion = courseDto.Descriptrion,
                    Price = courseDto.Price,
                };
                await _courseRepository.AddCourse(course);

                var response = new ResponseBaseDto()
                {
                    IsError = false,
                    FeedbackMessage = "✓The course has been successfully created.",
                };
                return response;
            }
            catch (Exception ex)
            {
                ResponseBaseDto response = new ResponseBaseDto()
                {
                    IsError = true,
                    FeedbackMessage = $"✗An error occurred while creating the course. Error: {ex.Message}"
                };
                return response;
            }
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
