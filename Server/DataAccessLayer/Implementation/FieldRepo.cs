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

public class FieldRepo : IFieldRepo
{
    CoursesContext context;
    public FieldRepo(CoursesContext context)
    {
        this.context = context;
    }
    public async Task<Field> AddAsync(Field entity)
    {
        try
        {
            context.Fields.Add(entity);
            await context.SaveChangesAsync();
            return entity;
        }
        catch (Exception ex)
        {
            Debug.WriteLine(ex.ToString());
            throw new Exception("Failed to add a new field");
        }
    }

    public async Task<Field> DeleteAsync(int id)
    {
        Field f = context.Fields.FirstOrDefault(f => f.FieldId == id);
        if (f != null)
            context.Fields.Remove(f);
        context.SaveChanges();
        return f;
    }

    public async Task<PagedList<Field>> GetAllAsync(BaseQueryParams queryParams)
    {
        var queryable = context.Fields.AsQueryable();
        return PagedList<Field>.ToPagedList(queryable, queryParams.PageNumber, queryParams.PageSize);
    }

    public async Task<Field> GetSingleAsync(int id)
    {
        try
        {
            return await context.Fields.Where(field => field.FieldId == id).FirstOrDefaultAsync();
        }
        catch (Exception ex)
        {
            Debug.WriteLine(ex.ToString());
            throw new Exception($"Error in getting single field {id} data");
        }
    }

    public async Task<Field> UpdateAsync(int id, Field entity)
    {
            Field? field = context.Fields.FirstOrDefault(f => f.FieldId == id);
            if (field != null)
            {
                field = entity;
                context.SaveChanges();
            }
            return field;
    }
}
