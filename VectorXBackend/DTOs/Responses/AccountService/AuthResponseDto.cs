﻿using VectorXBackend.DTOs.SharedDTOs;

namespace VectorXBackend.DTOs.Responses.AccountService
{
    public class AuthResponseDto : ResponseBase
    {
        public UserDto User { get; set; }
    }
}