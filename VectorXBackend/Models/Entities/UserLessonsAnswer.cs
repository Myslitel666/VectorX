using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class UserLessonsAnswer
{
    public int Id { get; set; }

    public int UserLessonsId { get; set; }

    public int AnswerId { get; set; }

    public virtual Answer Answer { get; set; } = null!;

    public virtual UserLesson UserLessons { get; set; } = null!;
}
