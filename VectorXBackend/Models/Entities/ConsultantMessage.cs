using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class ConsultantMessage
{
    public int ConsultantMessageId { get; set; }

    public int ConsultId { get; set; }

    public string? TextMessage { get; set; }

    public DateTime? SendingDateTime { get; set; }

    public virtual ICollection<ChatWithLearner> ChatWithLearners { get; set; } = new List<ChatWithLearner>();

    public virtual User Consult { get; set; } = null!;
}
