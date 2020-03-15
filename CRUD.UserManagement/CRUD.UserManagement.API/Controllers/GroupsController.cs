using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRUD.UserManagement.Services.Interfaces;
using CRUD.UserManagement.Services.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace CRUD.User.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly IGroupService groupService;
        public GroupsController(IGroupService groupService)
        {
            this.groupService = groupService;
        }

        /// <summary>
        /// Get All Groups
        /// </summary>
        /// <returns>List of all groups</returns>
        // GET api/values
        [HttpGet]
        public ActionResult GetAll()
        {
            return Ok(this.groupService.GetAll());
        }

        /// <summary>
        /// Get Group By Id 
        /// </summary>
        /// <param name="id"></param>
        /// <returns>
        /// Group whose Id match with the parameter
        /// </returns>
        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            GroupDTO group = this.groupService.GetGroupById(id);

            if (group != null)
            {
                return Ok(group);
            }
            else
            {
                return NotFound();
            }
        }

        /// <summary>
        /// Add New Group
        /// </summary>
        /// <param name="groupDTO"></param>
        /// <returns>group who recently added</returns>
        // POST api/values
        [HttpPost]
        public ActionResult Post([FromBody] GroupDTO groupDTO)
        {
            GroupDTO group = this.groupService.Add(groupDTO);
            return Ok(group);
        }

        /// <summary>
        /// Update an exiting group
        /// </summary>
        /// <param name="groupDTO"></param>
        /// <returns>group who recently updated </returns>
        // PUT api/values/5
        [HttpPut]
        public ActionResult Put([FromBody] GroupDTO groupDTO)
        {
            GroupDTO group = this.groupService.Update(groupDTO);
            return Ok(group);
        }

        /// <summary>
        /// delete group by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Ok in case no exception fire</returns>
        // DELETE api/values/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            if (this.groupService.Delete(id))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }


        /// <summary>
        /// Get All Groups for specific user
        /// </summary>
        /// <returns>List of all groups per user Id </returns>
        // GET api/values
        [HttpGet("userGroups/{userId}")]
        public ActionResult GetUserGroups(int userId)
        {
            return Ok(this.groupService.GetUserGroups(userId));
        }

        /// <summary>
        /// Assign user to group
        /// </summary>
        /// <returns>success / bad request </returns>
        // GET api/values
        [HttpGet("AddUserGroup/{userId}/{groupId}")]
        public ActionResult AddUserGroup(string userId, string groupId)
        {

            int UserId = int.Parse(userId);
            int GroupId = int.Parse(groupId);

            if (this.groupService.AddUserGroup(GroupId, UserId))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }

        }

        /// <summary>
        /// Remove user from group
        /// </summary>
        /// <returns>Success / bad request </returns>
        // GET api/values
        [HttpDelete("deleteUserGroup/{userId}/{groupId}")]
        public ActionResult deleteUserGroup(int userId, int groupId)
        {
            if (this.groupService.RemoveUserGroup(groupId, userId))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
