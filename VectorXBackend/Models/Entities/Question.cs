using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class Question
{
    public int QuestionId { get; set; }

    public int TestId { get; set; }

    public virtual ICollection<Answer> Answers { get; set; } = new List<Answer>();

    public virtual ICollection<QuestionVersion> QuestionVersions { get; set; } = new List<QuestionVersion>();

    public virtual Test Test { get; set; } = null!;
}
