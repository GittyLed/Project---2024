using BusinessLogicLayer.Implementation;
using BusinessLogicLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer;

public class BlManager
{
    public UserRepoBl UserRepoBl { get; set; }
    public BlManager()
    {
        UserRepoBl = new UserRepoBl();
    }
}
