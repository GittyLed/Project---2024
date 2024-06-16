using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Api
{
    public class CourseBl
    {
        public int CourseId { get; set; }

        public string CourseName { get; set; }

        public int NumOfMeetings { get; set; }

        public int Price { get; set; }

        public int FieldId { get; set; }
    }
}
