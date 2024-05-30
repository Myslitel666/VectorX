using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class CourseAppealBlocking
{
    public int CourseAppealBlockingId { get; set; }

    public int CourseId { get; set; }

    public string? AppealTitle { get; set; }

    public string? AppealText { get; set; }

    public string? AnswerText { get; set; }

    public bool? AppealResult { get; set; }

    public DateTime? AppealDateTime { get; set; }

    public DateTime? AnswerDateTime { get; set; }

    public virtual Course Course { get; set; } = null!;
}
