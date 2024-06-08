using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class UserStatusChannel
{
    public int UserStatusChannelId { get; set; }

    public int UserId { get; set; }

    public int ForumChannelId { get; set; }

    public bool IsBlockStatus { get; set; }

    public virtual ForumChannel ForumChannel { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
