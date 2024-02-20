using DataAccessLayer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DataAccessLayer.Api;
using Common;
using DataAccessLayer;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        ICoursesRepo course;
        public CoursesController(ICoursesRepo course)
        {
            this.course = course;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Course>>> GetAll([FromQuery] BaseQueryParams queryParams)
        {
            return await course.GetAllAsync(queryParams);
        }
    }
}
