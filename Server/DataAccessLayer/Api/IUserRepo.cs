using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Api
{
    public interface IUserRepo : IRepository<User>
    {
        User GetByName(string username);
    }
}
