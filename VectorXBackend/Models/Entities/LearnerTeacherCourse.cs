using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class LearnerTeacherCourse
{
    public int Id { get; set; }

    public int LearnerId { get; set; }

    public int TeacherId { get; set; }

    public int CourseId { get; set; }

    public virtual Course Course { get; set; } = null!;

    public virtual User Learner { get; set; } = null!;

    public virtual User Teacher { get; set; } = null!;
}
