using BusinessLogicLayer.Api;
using BusinessLogicLayer.Implementation;
using BusinessLogicLayer.Models;
using DataAccessLayer;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer;

public class BlManager
{
    public UserRepoBl UserRepoBl { get;}
    public BlManager()
    {
        ServiceCollection services = new();
        services.AddScoped<DalManager>();
        services.AddScoped<IUserRepoBl, UserRepoBl>();
        ServiceProvider servicesProvider = services.BuildServiceProvider();
        UserRepoBl = (UserRepoBl)servicesProvider.GetRequiredService<IUserRepoBl>();
    }
}
