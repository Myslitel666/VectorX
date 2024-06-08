using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class UserCourse
{
    public int UserCourseId { get; set; }

    public int LearnerId { get; set; }

    public int CourseId { get; set; }

    public bool IsPaid { get; set; }

    public DateTime? PurchaseDate { get; set; }

    public virtual Course Course { get; set; } = null!;

    public virtual ICollection<EducationalProgramCourse> EducationalProgramCourses { get; set; } = new List<EducationalProgramCourse>();

    public virtual User Learner { get; set; } = null!;
}
