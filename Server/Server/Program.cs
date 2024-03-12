using DataAccessLayer.Api;
using DataAccessLayer.Implementation;
using Common;
using Microsoft.EntityFrameworkCore;
using DBAccess;
using DataAccessLayer.Models;
using BusinessLogicLayer;
using DataAccessLayer;
using Microsoft.AspNetCore.Cors.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<BlManager>();
builder.Services.AddControllers();


builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder =>
        {
            builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowAnyOrigin();
        });
});


DBActions actions = new DBActions(builder.Configuration);
var connString = actions.GetConnectionString("CoursesDB");
builder.Services.AddDbContext<CoursesContext>(options => options.UseSqlServer(connString));


var app = builder.Build();

app.UseCors("CORSPolicy");
app.MapControllers();

app.Run();
