using VectorXBackend.DTOs.SharedDTOs;

namespace VectorXBackend.DTOs.Responses.VectorX.CourseManagement
{
    public class SubjectsResponseDto
    {
        public int SubjectId { get; set; }
        public string SubjectName { get; set; }
        public string SubjectDescription { get; set; }
    }
}