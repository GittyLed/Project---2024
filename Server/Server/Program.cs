using DataAccessLayer.Api;
using DataAccessLayer.Implementation;
using Common;
using Microsoft.EntityFrameworkCore;
using DBAccess;
using DataAccessLayer.Models;
using BusinessLogicLayer;
using DataAccessLayer;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddScoped<ICoursesRepo, CoursesRepo>();
builder.Services.AddScoped<BlManager, BlManager>();
builder.Services.AddScoped<DalManager, DalManager>();


DBActions actions = new DBActions(builder.Configuration);
var connString = actions.GetConnectionString("CoursesDB");
builder.Services.AddDbContext<CoursesContext>(options => options.UseSqlServer(connString));


var app = builder.Build();

app.MapControllers();

app.Run();
