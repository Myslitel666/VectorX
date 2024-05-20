using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class LearnerMessage
{
    public int LearnerMessageId { get; set; }

    public int UserId { get; set; }

    public string? TextMessage { get; set; }

    public DateTime? SendingDateTime { get; set; }

    public virtual User User { get; set; } = null!;
}
