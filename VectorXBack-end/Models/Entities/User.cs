using System;
using System.Collections.Generic;

namespace EnglishAssistantBackend.Models.Entities;

public partial class User
{
    public int UserId { get; set; }

    public int RoleId { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public virtual Role Role { get; set; } = null!;

    public virtual ICollection<UserJargon> UserJargons { get; set; } = new List<UserJargon>();
}
