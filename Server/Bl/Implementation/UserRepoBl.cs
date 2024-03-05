using BusinessLogicLayer.Api;
using BusinessLogicLayer.Models;
using Common;
using DataAccessLayer;
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
    DalManager dal;
    public UserRepoBl()
    {
        dal = new DalManager();
    }

    public async Task<User> AddUser(UserBl user)
    {
        User newUser = new User();
        newUser.Name = user.FirstName + " " + user.LastName;
        newUser.Email = user.Email;
        newUser.Password = user.Password;
        await dal.User.AddAsync(newUser);
        return newUser;
    }

    public List<UserBl> GetUsers(BaseQueryParams queryParams)
    {
        Task<PagedList<User>> users = dal.User.GetAllAsync(queryParams);
        List<UserBl> usersList = new List<UserBl>();
        foreach (var user in users.Result)
        {
            UserBl newUser = new UserBl();
            newUser.FirstName = user.Name.Split(' ')[0];
            newUser.LastName = user.Name.Split(" ")[1];
            newUser.Email = user.Email;
            newUser.Password = user.Password;
        }
        return usersList;
    }

    public UserBl GetById(int id)
    {
        Task<User> user = dal.User.GetSingleAsync(id);
        UserBl newUser = new UserBl();
        newUser.FirstName = user.Result.Name.Split(' ')[0];
        newUser.LastName = user.Result.Name.Split(" ")[1];
        newUser.Email = user.Result.Email;
        newUser.Password = user.Result.Password;
        return newUser;
    }


}
