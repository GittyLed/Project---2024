using DataAccessLayer.Api;
using DataAccessLayer.Implementation;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer;

public class DalManager
{
    public CoursesRepo Courses { get;}
    public TeachersRepo Teachers { get;}
    public UserRepo Users { get;}
    public FieldRepo Fields { get;}
    public DalManager(string connString)
    {
        ServiceCollection services = new();
        services.AddDbContext<CoursesContext>(op => op.UseSqlServer(connString));
        services.AddScoped<ICoursesRepo, CoursesRepo>();
        services.AddScoped<ITeacherRepo, TeachersRepo>();
        services.AddScoped<IUserRepo, UserRepo>();
        services.AddScoped<IFieldRepo, FieldRepo>();

        ServiceProvider servicesProvider = services.BuildServiceProvider();
        
        Courses = (CoursesRepo)servicesProvider.GetRequiredService<ICoursesRepo>();
        Teachers =(TeachersRepo) servicesProvider.GetRequiredService<ITeacherRepo>();
        Users = (UserRepo) servicesProvider.GetRequiredService<IUserRepo>();
        Fields = (FieldRepo) servicesProvider.GetRequiredService<IFieldRepo>();
    }

}