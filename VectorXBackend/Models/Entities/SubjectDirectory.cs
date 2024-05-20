using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class SubjectDirectory
{
    public int SubjectId { get; set; }

    public string? SubjectName { get; set; }

    public string? SubjectDescription { get; set; }

    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
}
