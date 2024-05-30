using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class LessonVersion
{
    public int LessonVersionId { get; set; }

    public int LessonId { get; set; }

    public string? LessonName { get; set; }

    public string? LessonContent { get; set; }

    public byte[]? LessonFile { get; set; }

    public string? LessonTask { get; set; }

    public DateTime? CreationDate { get; set; }

    public virtual Lesson Lesson { get; set; } = null!;
}
