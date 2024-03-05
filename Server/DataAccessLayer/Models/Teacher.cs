using System;
using System.Collections.Generic;

namespace DataAccessLayer.Models;

public partial class Teacher
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Email { get; set; }

    public string PhoneNumber { get; set; }

    public int CourseId { get; set; }

    public virtual Course Course { get; set; }
}
