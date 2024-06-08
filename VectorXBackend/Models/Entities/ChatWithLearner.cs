using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class ChatWithLearner
{
    public int Id { get; set; }

    public int LearnerId { get; set; }

    public int ConsultantMessageId { get; set; }

    public virtual ConsultantMessage ConsultantMessage { get; set; } = null!;

    public virtual User Learner { get; set; } = null!;
}
