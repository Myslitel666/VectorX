using VectorXBackend.Interfaces.Repositories.VectorX;
using VectorXBackend.Interfaces.Services;
using VectorXBackend.DTOs.Responses.VectorX.CourseManagement;
using VectorXBackend.DTOs.SharedDTOs;
using VectorXBackend.Models.Entities;
using VectorXBackend.DTOs.Requests.VectorX.CourseManagement;

namespace VectorXBackend.Services.VectorX
{
    public class CourseCreationService : ICourseCreationService
    {
        private readonly ICourseRepository _courseRepository;
        private readonly ISubjectRepository _subjectRepository;
        private readonly ICourseStatusDirectoryRepository _courseStatusDirectoryRepository;
        private readonly ICourseStatusesRepository _courseStatusesRepository;
        private readonly ICourseSectionRepository _courseSectionRepository;
        private readonly ILessonRepository _lessonRepository;
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

        //Constructor
        public CourseCreationService(
            ICourseRepository courseRepository,
            ISubjectRepository subjectRepository,
            ICourseStatusDirectoryRepository courseStatusDirectoryRepository,
            ICourseStatusesRepository courseStatusesRepository,
            ICourseSectionRepository courseSectionRepository,
            ILessonRepository lessonRepository
        )
        {
            _courseRepository = courseRepository;
            _subjectRepository = subjectRepository;
            _courseStatusDirectoryRepository = courseStatusDirectoryRepository;
            _courseStatusesRepository = courseStatusesRepository;
            _courseSectionRepository = courseSectionRepository;
            _lessonRepository = lessonRepository;
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

            var lastSectionId = 0;

            //Добавляем несколько разделов
            for (int i = 0; i < 3; i++)
            {
                var courseSection = new CourseSection()
                {
                    CourseId = courseId,
                    LastSectionId = i == 0 ? null : lastSectionId,
                    SectionName = "Enter your course section name",
                    IsDeleted = false
                };

                lastSectionId = await _courseSectionRepository.AddCourseSection(courseSection);
            }

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
        public async Task<IEnumerable<CourseSection>> GetCourseSectionsList(CourseIdDto courseIdDto)
        {
            //Извлекаем список разделов
            int courseId = courseIdDto.CourseId;
            var sectionsList = await _courseSectionRepository.GetSectionsByCourseId(courseId);

            // Находим первый раздел (у которого LastSectionId равен null)
            var orderedSections = new List<CourseSection>();
            var currentSection = sectionsList.FirstOrDefault(s => s.LastSectionId == null);

            // Последовательно добавляем каждый следующий раздел
            while (currentSection != null)
            {
                orderedSections.Add(currentSection);
                currentSection = sectionsList.FirstOrDefault(s => s.LastSectionId == currentSection.CourseSectionId);
            }

            return orderedSections;
        }
        public async Task<int> CreateCourseSection(CourseIdDto courseIdDto)
        {
            var courseId = courseIdDto.CourseId;
            var sections = await _courseSectionRepository.GetSectionsByCourseId(courseId);
            var sectionsList = sections.ToList();
            var finalSectionIndex = sectionsList.Count() - 1;
            var lastSectionId = sectionsList[finalSectionIndex].CourseSectionId;

            var courseSection = new CourseSection()
            {
                CourseId = courseId,
                LastSectionId = lastSectionId,
                SectionName = "Enter your course section name",
                IsDeleted = false
            };

            var courseSectionId = await _courseSectionRepository.AddCourseSection(courseSection);
            return courseSectionId;
        }
        public async Task DeleteCourseSection(CourseSectionIdDto courseSectionIdDto)
        {
            var courseSectionId = courseSectionIdDto.CourseSectionId;

            //Извлекаем текущий раздел
            var courseSection = await _courseSectionRepository.GetSectionById(courseSectionId);

            //Удаляем текущий раздел
            courseSection.IsDeleted = true;
            await _courseSectionRepository.RedactCourseSection(courseSection);

            //Извлекаем следующий раздел
            var nextSection = await _courseSectionRepository.GetSectionByLastSectionId(courseSectionId);

            //Изменяем ссылку на предыдущий курс
            if (nextSection != null)
            {
                var lastSectionId = courseSection.LastSectionId;
                nextSection.LastSectionId = lastSectionId;
                await _courseSectionRepository.RedactCourseSection(nextSection);
            }
        }
        public async Task RedactCourseSection(CourseSectionRedactDto courseSectionRedactDto)
        {
            var courseSectionId = courseSectionRedactDto.CourseSectionId;
            var courseSection = await _courseSectionRepository.GetSectionById(courseSectionId);
            var redactSection = courseSectionRedactDto.SectionName;
            courseSection.SectionName = redactSection;
            await _courseSectionRepository.RedactCourseSection(courseSection);
        }
        public async Task<IEnumerable<Lesson>> GetLessonsList(CourseSectionIdDto courseSectionIdDto)
        {
            //Извлекаем список уроков
            int courseSectionId = courseSectionIdDto.CourseSectionId;
            var lessonsList = await _lessonRepository.GetLessonsBySectionId(courseSectionId);

            // Находим первый урок (у которого LastLessonId равен null)
            var orderedLessons = new List<Lesson>();
            var currentLesson = lessonsList.FirstOrDefault(l => l.LastLessonId == null);

            // Последовательно добавляем каждый следующий раздел
            while (currentLesson != null)
            {
                orderedLessons.Add(currentLesson);
                currentLesson = lessonsList.FirstOrDefault(s => s.LastLessonId == currentLesson.LastLessonId);
            }

            return orderedLessons;
        }
        public async Task<int> CreateLesson(CourseSectionIdDto courseSectionIdDto)
        {
            var courseSectionId = courseSectionIdDto.CourseSectionId;
            var lessons = await _lessonRepository.GetLessonsBySectionId(courseSectionId);
            var lessonsList = lessons.ToList();
            var finalLessonIndex = lessonsList.Count() - 1;
            var lastLessonId = lessonsList[finalLessonIndex].LessonId;

            var lesson = new Lesson()
            {
                SectionCourseId = courseSectionId,
                LastLessonId = lastLessonId,
                LessonName = "Enter your lesson name",
                IsDeleted = false
            };

            var lessonId = await _lessonRepository.AddLesson(lesson);
            return lessonId;
        }
        public async Task DeleteLesson(LessonIdDto lessonIdDto)
        {
            var lessonId = lessonIdDto.LessonId;

            //Извлекаем текущий урок
            var lesson = await _lessonRepository.GetLessonById(lessonId);

            //Удаляем текущий раздел
            lesson.IsDeleted = true;
            await _lessonRepository.RedactLesson(lesson);

            //Извлекаем следующий урок
            var nextLesson = await _lessonRepository.GetLessonByLastLessonId(lessonId);

            //Изменяем ссылку на предыдущий курс
            if (nextLesson != null)
            {
                var lastLessonId = lesson.LastLessonId;
                nextLesson.LastLessonId = lastLessonId;
                await _lessonRepository.RedactLesson(nextLesson);
            }
        }
        public async Task RedactLesson(LessonRedactDto lessonRedactDto)
        {
            var lessonId = lessonRedactDto.LessonId;
            var lesson = await _lessonRepository.GetLessonById(lessonId);
            var redactLesson = lessonRedactDto.LessonName;
            lesson.LessonName = redactLesson;
            await _lessonRepository.RedactLesson(lesson);
        }
    }
}
