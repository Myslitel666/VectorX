using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class ForumChannel
{
    public int ForumChannelId { get; set; }

    public int AuthorId { get; set; }

    public byte[]? ChannelTitle { get; set; }

    public string? Description { get; set; }

    public DateTime? CreationDate { get; set; }

    public virtual User Author { get; set; } = null!;

    public virtual ICollection<ForumChannelMessage> ForumChannelMessages { get; set; } = new List<ForumChannelMessage>();

    public virtual ICollection<UserStatusChannel> UserStatusChannels { get; set; } = new List<UserStatusChannel>();
}
