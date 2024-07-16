﻿using DataAccessLayer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DataAccessLayer.Api;
using Common;
using DataAccessLayer;
using BusinessLogicLayer.Api;
using BusinessLogicLayer.Implementation;
using BusinessLogicLayer;
using Microsoft.AspNetCore.Cors;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        CourseBlRepo courses;
        public CoursesController(BlManager blManager)
        {
            courses = blManager.CourseBlRepo;
        }

        [HttpGet]
        public async Task<ActionResult<List<CourseBl>>> GetAll([FromQuery] BaseQueryParams queryParams)
        {
            return await courses.GetAllCoursesAsync(queryParams);
        }
        [HttpPost]
        public async Task<ActionResult<CourseBl>> AddCourse([FromBody] CourseBl newCourse)
        {
            return await courses.CreateCourseAsync(newCourse);
        }

        [HttpDelete("{courseId}")]
        public async Task<ActionResult<CourseBl>> Delete(int courseId)
        {
            return await courses.DeleteCourseAsync(courseId);
        }

        [HttpPut("{courseId}")]
        [EnableCors]
        public async Task<ActionResult<CourseBl>> Update(int courseId, [FromBody] CourseBl newCourse)
        {
            return await courses.UpdateCourseAsync(courseId, newCourse);
        }
    }
}
