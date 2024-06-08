using System;
using System.Collections.Generic;

namespace VectorXBackend.Models.Entities;

public partial class JargonDictionary
{
    public int Id { get; set; }

    public string? Jargon { get; set; }

    public string? Translate { get; set; }

    public string? ExampleOfUse { get; set; }
}
