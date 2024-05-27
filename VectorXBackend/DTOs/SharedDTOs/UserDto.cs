using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VectorXBackend.DTOs.SharedDTOs;

public partial class UserDto
{
    public int UserId { get; set; }

    public string? UserRole { get; set; }

    public string? Username { get; set; }

    public byte[]? Avatar { get; set; }

    public string? Password { get; set; }

    public bool IsBlocked { get; set; }

    public int Balance { get; set; }
}

public partial class UserIdDto
{
    public int UserId { get; set; }
}
