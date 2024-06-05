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
    public UserBlRepo UserBlRepo { get;}
    public AuthUser AuthUser { get;}
    public BlManager(string connString)
    {
        ServiceCollection services = new();
        services.AddScoped(d => new DalManager(connString));
        services.AddScoped<IUserBlRepo, UserBlRepo>();
        services.AddScoped<IAuthUser, AuthUser>();
        services.AddScoped<IEmailService, EmailService>();
        ServiceProvider servicesProvider = services.BuildServiceProvider();
        UserBlRepo = (UserBlRepo)servicesProvider.GetRequiredService<IUserBlRepo>();
        AuthUser = (AuthUser)servicesProvider.GetRequiredService<IAuthUser>();
    }
}
