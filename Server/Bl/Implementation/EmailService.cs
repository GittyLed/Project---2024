using BusinessLogicLayer.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Implementation
{
    public class EmailService : IEmailService
    {
        public async Task SendWelcomeEmail(string emailAddress)
        {
            // Configure the SMTP client
            using (var smtpClient = new SmtpClient("smtp.gmail.com"))
            {
                // Set credentials if required
                smtpClient.Port = 587;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential("gled9565@gmail.com", "password");
                smtpClient.EnableSsl = true;

                // Create the email message
                var message = new MailMessage();
                message.To.Add(emailAddress);
                message.Subject = "Welcome to our platform!";
                message.Body = "Thank you for signing up.";

                // Send the email asynchronously
                await smtpClient.SendMailAsync(message);
            }
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            var message = new MailMessage();
            message.From = new MailAddress("gled9565@gmail.com");
            message.To.Add(to);
            message.Subject = subject;
            message.Body = body;
            message.IsBodyHtml = true; // Set to true if the body is in HTML format

            using (var smtpClient = new SmtpClient("smtp.gmail.com"))
            {
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential("gled9565@gmail.com", "password");
                smtpClient.EnableSsl = true; // Enable SSL if required by your SMTP server

                await smtpClient.SendMailAsync(message); // This line sends the email asynchronously
            }
        }
    }
}
