using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class MarkDirectory
{
    public int MarkId { get; set; }

    public int MarkValue { get; set; }

    public virtual ICollection<UserLesson> UserLessons { get; set; } = new List<UserLesson>();
}
