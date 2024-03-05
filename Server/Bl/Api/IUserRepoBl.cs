using BusinessLogicLayer.Models;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Api;

public interface IUserRepoBl
{
    public Task<User> AddUser(UserBl user);
}
