using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class Answer
{
    public int AnswerId { get; set; }

    public int QuestionId { get; set; }

    public string AnswerContent { get; set; } = null!;

    public bool? IsRight { get; set; }

    public virtual Question Question { get; set; } = null!;

    public virtual ICollection<UserLessonsAnswer> UserLessonsAnswers { get; set; } = new List<UserLessonsAnswer>();
}
