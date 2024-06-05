using DataAccessLayer.Api;
using DataAccessLayer.Implementation;
using Common;
using Microsoft.EntityFrameworkCore;
using DBAccess;
using DataAccessLayer.Models;
using BusinessLogicLayer;
using DataAccessLayer;
using Microsoft.AspNetCore.Cors.Infrastructure;
using BusinessLogicLayer.Api;
using BusinessLogicLayer.Implementation;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();


builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder =>
        {
            builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:3000");
        });
});


DBActions actions = new DBActions(builder.Configuration);
var connString = actions.GetConnectionString("CoursesDB");
builder.Services.AddScoped(b => new BlManager(connString));
/*builder.Services.AddScoped<IAuthUser, AuthUser>();*/


var app = builder.Build();

app.UseCors("CORSPolicy");
app.MapControllers();

app.Run();


