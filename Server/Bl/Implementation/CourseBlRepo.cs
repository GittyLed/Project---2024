using BusinessLogicLayer.Api;
using BusinessLogicLayer.Models;
using Common;
using DataAccessLayer;
using DataAccessLayer.Implementation;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Implementation;

public class CourseBlRepo : ICourseBlRepo
{
    CoursesRepo courses;
    public CourseBlRepo(DalManager dalManager)
    {
        courses = dalManager.Courses;
    }
    public async Task<CourseBl> CreateCourseAsync(CourseBl course)
    {
        var newCourse = new Course
        {
            CourseName = course.CourseName,
            Price = course.Price,
            NumOfMeetings = course.NumOfMeetings,
            FieldId = course.FieldId
        };
        await courses.AddAsync(newCourse);
        course.CourseId = newCourse.CourseId;
        return course;
    }

    public Task<CourseBl> DeleteCourseAsync(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<List<CourseBl>> GetAllCoursesAsync(BaseQueryParams queryParams)
    {
        Task<PagedList<Course>> pagedCourses = courses.GetAllAsync(queryParams);
        List<CourseBl> coursesList = new List<CourseBl>();
        foreach (var course in pagedCourses.Result)
        {
            coursesList.Add(new CourseBl
            {
                CourseId = course.CourseId,
                CourseName = course.CourseName,
                Price = course.Price,
                NumOfMeetings = course.NumOfMeetings,
                FieldId = course.FieldId
            });
        }
        return coursesList;
    }

    public async Task<CourseBl> GetCourseByIdAsync(int id)
    {
        var course = courses.GetSingleAsync(id);
        if (course == null)
        {
            return null;
        }
        var newCourse = new CourseBl
        {
            CourseId = course.Result.CourseId,
            CourseName = course.Result.CourseName,
            Price = course.Result.Price,
            NumOfMeetings = course.Result.NumOfMeetings,
            FieldId = course.Result.FieldId
        };

        //return await newCourse;
    }

    public Task<CourseBl> UpdateCourseAsync(CourseBl course)
    {
        throw new NotImplementedException();
    }
}
