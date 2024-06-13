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

public class UserBlRepo : IUserBlRepo
{
    UserRepo users;
    IEmailService emailService;
    public UserBlRepo(DalManager dalManager, IEmailService emailService)
    {
        users = dalManager.Users;
        this.emailService = emailService;
    }

    public async Task<UserBl> AddUser(UserBl user)
    {
        User newUser = new User();
        newUser.Name = user.Name;
        newUser.Email = user.Email;
        newUser.Password = user.Password;
        await users.AddAsync(newUser);
        await emailService.SendWelcomeEmail(user.Email);
        user.Id = newUser.Id;
        return user;
    }

    public List<UserBl> GetUsers(BaseQueryParams queryParams)
    {
        Task<PagedList<User>> pagedUsers = users.GetAllAsync(queryParams);
        List<UserBl> usersList = new List<UserBl>();
        foreach (var user in pagedUsers.Result)
        {
            usersList.Add(new UserBl
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Password = user.Password
            });
        }
        return usersList;
    }

    public UserBl GetUserByName(string name)
    {
        User user = users.GetByName(name);
        if (user == null)
        {
            return null;
        }
        UserBl newUser = new UserBl();
        newUser.Name = user.Name;
        newUser.Email = user.Email;
        newUser.Password = user.Password;
        return newUser;
    }




}
