﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CRUD.UserManagement.Domain
{
    public class UserGroup
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int GroupId { get; set; }
        public Group Group { get; set; }
    }
}
