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

    public async Task<CourseBl> DeleteCourseAsync(int id)
    {

        var course = await courses.DeleteAsync(id);
        var newCourse = new CourseBl
        {
            CourseId = course.CourseId,
            CourseName = course.CourseName,
            Price = course.Price,
            NumOfMeetings = course.NumOfMeetings,
            FieldId = course.FieldId
        };
        return newCourse;
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
        var course =  await courses.GetSingleAsync(id);
        if (course == null)
        {
            return null;
        }
        var newCourse = new CourseBl
        {
            CourseId = course.CourseId,
            CourseName = course.CourseName,
            Price = course.Price,
            NumOfMeetings = course.NumOfMeetings,
            FieldId = course.FieldId
        };

        return newCourse;
    }

    public async Task<CourseBl> UpdateCourseAsync(int courseId, CourseBl course)
    {
        var newCourse = new Course
        {
            CourseName = course.CourseName,
            Price = course.Price,
            NumOfMeetings = course.NumOfMeetings,
            FieldId = course.FieldId
        };
        var updatedCourse = await courses.UpdateAsync(courseId, newCourse);
        var updatedCourseBl = new CourseBl
        {
            CourseId = course.CourseId,
            CourseName = course.CourseName,
            Price = course.Price,
            NumOfMeetings = course.NumOfMeetings,
            FieldId = course.FieldId
        };

        return updatedCourseBl;
    }
}
