namespace VectorXBackend.DTOs.Requests.VectorX.TakingCourses
{
    public class SectionCourseDto
    {
        public int CourseId { get; set; }

        public int? LastSectionId { get; set; }

        public string? SectionName { get; set; }

        public string? Description { get; set; }
    }
}