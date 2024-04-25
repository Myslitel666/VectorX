using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VectorXBackend.DTOs.SharedDTOs;

public partial class UserDto2
{
    public int UserId { get; set; }

    public string? Role { get; set; }

    public string? Username { get; set; }

    public string? Avatar { get; set; }

    public string? Password { get; set; }
}
