using BusinessLogicLayer;
using BusinessLogicLayer.Models;
using Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        BlManager BlManager;
        public UserController(BlManager BlManager)
        {
            this.BlManager = BlManager;
        }

        [HttpGet]
        public List<UserBl> GetUsers([FromQuery] BaseQueryParams queryParams) 
        {
            return BlManager.UserRepoBl.GetUsers(queryParams);
        }
    }
}
