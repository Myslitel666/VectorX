using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class CourseStatusDirectory
{
    public int CourseStatusId { get; set; }

    public string? StatusName { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<CourseStatus> CourseStatuses { get; set; } = new List<CourseStatus>();
}
