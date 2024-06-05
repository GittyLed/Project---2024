using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLogicLayer.Models;

namespace BusinessLogicLayer.Api
{
    public interface IAuthUser
    {
        Task<UserBl> AuthenticateUserAsync(string username, string password);
        Task<UserBl> CreateUserAsync(string username, string password, string email);
        Task<bool> UserExists(string username);
        //string GenerateToken(UserBl user);
    }
}
