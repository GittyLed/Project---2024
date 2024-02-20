using Common;
using DataAccessLayer.Api;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
        public Task<Course> AddAsync(Course entity)
        {
            throw new NotImplementedException();
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

        public Task<Course> GetSingleAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Course> UpdateAsync(Course entity)
        {
            throw new NotImplementedException();
        }
    }
}
