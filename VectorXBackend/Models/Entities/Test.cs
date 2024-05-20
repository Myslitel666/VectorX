using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class Test
{
    public int TestId { get; set; }

    public int LessonId { get; set; }

    public bool IsDeleted { get; set; }

    public virtual Lesson Lesson { get; set; } = null!;

    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
}
