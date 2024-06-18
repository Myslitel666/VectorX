namespace VectorXBackend.DTOs.Requests.VectorX.CourseManagement
{
    public class CourseSectionDto
    {
        public int CourseId { get; set; }

        public int? LastSectionId { get; set; }

        public string? SectionName { get; set; }

        public string? Description { get; set; }
    }

    public partial class CourseSectionIdDto
    {
        public int CourseSectionId { get; set; }
    }

}