using System;
using System.Collections.Generic;
using System.Text;

namespace CRUD.UserManagement.Services.DTOs
{
    public class GroupDTO
    {
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public int GroupAdmin { get; set; }
        public string GroupAdminName { get; set; }
        public List<UserGroupDTO> userGroups { get; set; }
    }
}
