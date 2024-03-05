using DataAccessLayer.Implementation;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer;

public class DalManager
{
    public CoursesRepo Courses { get; set; }
    public TeachersRepo Teachers { get; set; }
    public UserRepo User { get; set; }
    public FieldRepo Field { get; set; }
    public DalManager()
    {
        CoursesContext database = new CoursesContext();
        Courses = new CoursesRepo(database);
        Teachers = new TeachersRepo(database);
        User = new UserRepo(database);
        Field = new FieldRepo(database);
    }

}