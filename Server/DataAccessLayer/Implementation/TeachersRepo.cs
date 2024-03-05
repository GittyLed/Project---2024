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

namespace DataAccessLayer.Implementation;

public class TeachersRepo : ITeacherRepo
{
    CoursesContext context;
    public TeachersRepo(CoursesContext context)
    {
        this.context = context;
    }
    public async Task<Teacher> AddAsync(Teacher entity)
    {
        try
        {
            context.Teachers.Add(entity);
            await context.SaveChangesAsync();
            return entity;
        }
        catch (Exception ex)
        {
            Debug.WriteLine(ex.ToString());
            throw new Exception("Failed to add a new teacher");
        }
    }

    public async Task<Teacher> DeleteAsync(int id)
    {
        Teacher t = context.Teachers.FirstOrDefault(t => t.Id == id);
        if (t != null)
            context.Teachers.Remove(t);
        context.SaveChanges();
        return t;
    }

    public async Task<PagedList<Teacher>> GetAllAsync(BaseQueryParams queryParams)
    {
        var queryable = context.Teachers.AsQueryable();
        return PagedList<Teacher>.ToPagedList(queryable, queryParams.PageNumber, queryParams.PageSize);
    }

    public async Task<Teacher> GetSingleAsync(int id)
    {
        try
        {
            return await context.Teachers.Where(teacher => teacher.Id == id).FirstOrDefaultAsync();
        }
        catch (Exception ex)
        {
            Debug.WriteLine(ex.ToString());
            throw new Exception($"Error in getting single teacher {id} data");
        }
    }

    public async Task<Teacher> UpdateAsync(int id, Teacher entity)
    {
        Teacher? teacher = context.Teachers.FirstOrDefault(t => t.Id == id);
        if (teacher != null)
        {
            teacher = entity;
            context.SaveChanges();
        }
        return teacher;
    }
}
