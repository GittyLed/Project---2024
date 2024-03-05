using BusinessLogicLayer.Api;
using BusinessLogicLayer.Models;
using DataAccessLayer.Api;
using DataAccessLayer.Implementation;
using DataAccessLayer.Models;
using DBAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Implementation;

public class UserRepoBl : IUserRepoBl
{
    IUserRepo userRepo;
    public UserRepoBl()
    {
        /*DBActions actions = new DBActions();
        var connString = actions.GetConnectionString("CoursesDB");
        userRepo = new UserRepo(new CoursesContext()));*/
    }

    public async Task<User> AddUser(UserBl user)
    {
        User newUser = new User();
        newUser.Name = user.FirstName + " " + user.LastName;
        newUser.Email = user.Email;
        newUser.Password = user.Password;
        userRepo.AddAsync(newUser);
        return newUser;
        
    }
}
