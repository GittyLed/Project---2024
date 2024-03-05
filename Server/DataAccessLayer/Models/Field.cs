using System;
using System.Collections.Generic;

namespace DataAccessLayer.Models;

public partial class Field
{
    public int FieldId { get; set; }

    public string FieldName { get; set; }

    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
}
