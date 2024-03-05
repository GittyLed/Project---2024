using BusinessLogicLayer;
using BusinessLogicLayer.Models;
using Common;
using DataAccessLayer;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        BlManager BlManager;
        DalManager DalManager;
        public UserController(BlManager BlManager, DalManager DalManager )
        {
            this.BlManager = BlManager;
            this.DalManager = DalManager;
        }

        [HttpGet]
        public List<UserBl> GetUsers([FromQuery] BaseQueryParams queryParams)
        {
            return BlManager.UserRepoBl.GetUsers(queryParams);
        }

        [HttpGet("{id}")]
        public UserBl GetUserById(int id)
        {
            return BlManager.UserRepoBl.GetById(id);
        }


        /*[HttpGet]
        public Task<PagedList<User>> GetUserById([FromQuery] BaseQueryParams queryParams)
        {
            return DalManager.Users.GetAllAsync(queryParams);
        }*/

    }
}
