using System;
using System.Collections.Generic;

namespace EnglishAssistantBackend.Models.Entities;

public partial class Jargon
{
    public int JargonId { get; set; }

    public string? JargonInstance { get; set; }

    public string? Translate { get; set; }

    public string? ExampleOfUse { get; set; }

    public virtual ICollection<UserJargon> UserJargons { get; set; } = new List<UserJargon>();
}
