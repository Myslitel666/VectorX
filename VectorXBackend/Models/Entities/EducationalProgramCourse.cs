using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class EducationalProgramCourse
{
    public int Id { get; set; }

    public int EducationalProgramId { get; set; }

    public int UseCourseId { get; set; }

    public virtual EducationalProgram EducationalProgram { get; set; } = null!;

    public virtual UserCourse UseCourse { get; set; } = null!;
}
