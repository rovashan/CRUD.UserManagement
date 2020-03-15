﻿using CRUD.UserManagement.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace CRUD.UserManagement.Services.DTOs
{
    public class UserDTO
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
    }
}
