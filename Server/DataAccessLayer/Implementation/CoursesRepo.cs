using Common;
using DataAccessLayer.Api;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Implementation
{
    internal class CoursesRepo : ICouresesRepo
    {
        CoursesContext context;
        public CoursesRepo(CoursesContext context)
        {
            this.context = context;
        }
        public async Task<Course> AddAsync(Course entity)
        {
            try
            {
                context.Courses.Add(entity);
                await context.SaveChangesAsync();
                return entity;
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.ToString());
                throw new Exception("Failed to add a new course");
            }
        }

        public Task<Course> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<PagedList<Course>> GetAllAsync(BaseQueryParams queryParams)
        {
            var queryable = context.Courses.AsQueryable();
            return PagedList<Course>.ToPagedList(queryable, queryParams.PageNumber, queryParams.PageSize);
        }

        public async Task<Course> GetSingleAsync(int id)
        {
            try
            {
                return await context.Courses.Where(course => course.CourseId == id).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.ToString());
                throw new Exception($"Error in getting single course {id} data");
            }
        }

        /*public Task<Course>? UpdateAsync(int id, Course entity)
        {
            *//*Course course = context.Courses.FirstOrDefault(c => c.CourseId == id);
            if (course != null)
                course = entity;
            context.SaveChanges();
            return course;*//*
        }*/
    }
}
