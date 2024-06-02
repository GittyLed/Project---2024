using BusinessLogicLayer.Api;
using BusinessLogicLayer.Models;
using DataAccessLayer.Implementation;
using DataAccessLayer;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Implementation
{
    public class AuthUser : IAuthUser
    {
        IUserBlRepo users;
        public AuthUser(IUserBlRepo userBlRepo)
        {
            this.users = userBlRepo;   
        }

        public async Task<UserBl> AuthenticateUserAsync(string username, string password)
        {
            UserBl user = users.GetUserByName(username);
            if(user != null && user.Password == password)
            {
                return user;
            }
            return null;
           
        }

        public async Task<UserBl> CreateUserAsync(string username, string password, string email)
        {
            //maybe add token...
            UserBl user = new UserBl {Name = username, Password = password, Email = email };
            //what to return user or userbl
            //return await users.AddUser(user);
            return user;
        }

        /*public string GenerateToken(UserBl user)
        {
            throw new NotImplementedException();
        }*/
    }
}
