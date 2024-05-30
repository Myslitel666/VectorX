using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class ForumChannelMessage
{
    public int ForumChannelMessageId { get; set; }

    public int ForumChannelId { get; set; }

    public int AuthorMessageId { get; set; }

    public string? TextMessage { get; set; }

    public DateTime? SendingDateTime { get; set; }

    public virtual User AuthorMessage { get; set; } = null!;

    public virtual ForumChannel ForumChannel { get; set; } = null!;
}
