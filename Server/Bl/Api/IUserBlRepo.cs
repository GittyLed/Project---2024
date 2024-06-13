using BusinessLogicLayer.Models;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Api;

public interface IUserBlRepo
{
    public Task<UserBl> AddUser(UserBl user);
    UserBl GetUserByName(string name);
}
