using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class QuestionVersion
{
    public int QuestionVersionId { get; set; }

    public int QuestionId { get; set; }

    public int? LastQuestionId { get; set; }

    public string? QuestionContent { get; set; }

    public DateTime? CreationDate { get; set; }

    public virtual ICollection<QuestionVersion> InverseLastQuestion { get; set; } = new List<QuestionVersion>();

    public virtual QuestionVersion? LastQuestion { get; set; }

    public virtual Question Question { get; set; } = null!;
}
