using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Api
{
    public interface IEmailService
    {
        Task SendWelcomeEmail(string email);
    }
}
