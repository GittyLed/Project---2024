using BusinessLogicLayer;
using BusinessLogicLayer.Api;
using BusinessLogicLayer.Implementation;
using BusinessLogicLayer.Models;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        AuthUser authUser;
        public AuthenticationController(BlManager blManager)
        {
            this.authUser = blManager.AuthUser;
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserBl>> Login([FromBody] UserLogin model)
        {
            if (ModelState.IsValid)
            {
                UserBl user = await authUser.AuthenticateUserAsync(model.Username, model.Password);

                if (user != null)
                {
                    //var token = authUser.GenerateToken(user);
                    //await authUser.CreateUserAsync(user);

                    return Ok(user);
                }
                else
                {
                    return Unauthorized();
                }
            }

            return BadRequest(ModelState);
        }

        [HttpPost("Register")]
        public async Task<ActionResult<UserBl>> Register([FromBody] UserRegister model)
        {
            if (ModelState.IsValid)
            {
                var userExists = await authUser.UserExists(model.Username);
                if (userExists)
                    return BadRequest("username exists");
                
                var user = await authUser.CreateUserAsync(model.Username, model.Password, model.Email);

                if (user != null)
                {
                    //var token = GenerateToken(user); // Replace with actual token generation logic
                    return Ok(user);
                }

                return BadRequest("User creation failed");
            }

            return BadRequest(ModelState);
        }
    }
}
