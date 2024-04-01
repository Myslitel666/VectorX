using System;
using System.Collections.Generic;

namespace EnglishAssistantBackend.Models.Entities;

public partial class UserJargon
{
    public int UserJargonsId { get; set; }

    public int JargonId { get; set; }

    public int UserId { get; set; }

    public virtual Jargon Jargon { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
