﻿using BusinessLogicLayer;
using BusinessLogicLayer.Implementation;
using BusinessLogicLayer.Models;
using Common;
using DataAccessLayer;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        UserRepoBl users;
        public UserController(BlManager BlManager)
        {
            users = BlManager.UserRepoBl;
        }
        [EnableCors]
        [HttpGet]
        public List<UserBl> GetUsers([FromQuery] BaseQueryParams queryParams)
        {
            return users.GetUsers(queryParams);
        }
       /* [EnableCors]
        [HttpGet("{id}")]
        public UserBl GetUserById(int id)
        {
            return users.GetById(id);
        }*/

        [HttpGet("{name}")]
        public UserBl GetUserByNmae(string name)
        {
            return users.GetUserByName(name);
        }

        [EnableCors]
        [HttpPost]
        public User AddUser([FromBody] UserBl user)
        {
            return users.AddUser(user).Result;
        }


        /*[HttpGet]
        public Task<PagedList<User>> GetUserById([FromQuery] BaseQueryParams queryParams)
        {
            return DalManager.Users.GetAllAsync(queryParams);
        }*/

    }
}
