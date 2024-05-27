using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class CourseStatus
{
    public int Id { get; set; }

    public int CourseId { get; set; }

    public int CourseStatusId { get; set; }

    public int? UserActionId { get; set; }

    public virtual Course Course { get; set; } = null!;

    public virtual CourseStatusDirectory CourseStatuse { get; set; } = null!;

    public virtual UserAction UserAction { get; set; } = null!;
}
