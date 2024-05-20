using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class EducationalProgram
{
    public int EducationalProgramId { get; set; }

    public int LearnerId { get; set; }

    public byte[]? Title { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<EducationalProgramCourse> EducationalProgramCourses { get; set; } = new List<EducationalProgramCourse>();

    public virtual User Learner { get; set; } = null!;
}
