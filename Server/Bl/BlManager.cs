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
    public BlManager(string connString)
    {
        ServiceCollection services = new();
        services.AddScoped(d => new DalManager(connString));
        services.AddScoped<IUserRepoBl, UserRepoBl>();
        ServiceProvider servicesProvider = services.BuildServiceProvider();
        UserRepoBl = (UserRepoBl)servicesProvider.GetRequiredService<IUserRepoBl>();
    }
}
