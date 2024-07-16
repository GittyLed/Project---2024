using BusinessLogicLayer;
using BusinessLogicLayer.Implementation;
using BusinessLogicLayer.Models;
using Common;
using DataAccessLayer;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        UserBlRepo users;
        public UserController(BlManager BlManager)
        {
            users = BlManager.UserBlRepo;
        }
        [EnableCors]
        [HttpGet]
        public List<UserBl> GetUsers([FromQuery] BaseQueryParams queryParams)
        {
            return users.GetUsers(queryParams);
        }

        [HttpGet("{name}")]
        public ActionResult< UserBl> GetUserByName(string name)
        {
            UserBl user =  users.GetUserByName(name);
            if(user == null) return BadRequest("user not found");
            return Ok(user);
        }

        [EnableCors]
        [HttpPost]
        public UserBl AddUser([FromBody] UserBl user)
        {
            return users.AddUser(user).Result;
        }


    }
}
