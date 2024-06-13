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

public class UserRepo: IUserRepo
{
    CoursesContext context;
    public UserRepo(CoursesContext context)
    {
        this.context = context;
    }

    public async Task<User> AddAsync(User entity)
    {
        try
        {
            context.Users.Add(entity);
            await context.SaveChangesAsync();
            return entity;
        }
        catch (Exception ex)
        {
            Debug.WriteLine(ex.ToString());
            throw new Exception("Failed to add a new user");
        }
    }

    public async Task<User> DeleteAsync(int id)
    {
        User user = context.Users.FirstOrDefault(u => u.Id == id);
        if (user != null)
            context.Users.Remove(user);
        context.SaveChanges();
        return user;
    }

    public async Task<PagedList<User>> GetAllAsync(BaseQueryParams queryParams)
    {
         var queryable = context.Users.AsQueryable();
         return PagedList<User>.ToPagedList(queryable, queryParams.PageNumber, queryParams.PageSize);
    }

    public User GetByName(string username)
    {
        try
        {
            return context.Users.Where(user => user.Name == username).FirstOrDefault();
        }
        catch 
        {
            return null;
        }
        
    }

    public async Task<User> GetSingleAsync(int id)
    {
        try
        {
            return await context.Users.Where(user => user.Id == id).FirstOrDefaultAsync();
        }
        catch (Exception ex)
        {
            Debug.WriteLine(ex.ToString());
            throw new Exception($"Error in getting single user {id} data");
        }
    }

    public async Task<User> UpdateAsync(int id, User entity)
    {
        User? user = context.Users.FirstOrDefault(u => u.Id == id);
        if (user != null)
        {
            user = entity;
            context.SaveChanges();
        }
        return user;
    }
}
