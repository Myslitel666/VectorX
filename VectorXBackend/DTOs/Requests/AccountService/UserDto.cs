using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VectorXBackend.DTOs.Requests.AccountService;

public partial class UserDto
{
    public int UserId { get; set; }

    public string? Role { get; set; }

    public string? Username { get; set; }

    public byte[]? Avatar { get; set; }

    public string? Password { get; set; }
}
