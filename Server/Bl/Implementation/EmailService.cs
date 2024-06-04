using BusinessLogicLayer.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Implementation;

public class EmailService : IEmailService
{
    public async Task SendWelcomeEmail(string emailAddress)
    {
        using var smtpClient = new SmtpClient("smtp.office365.com", 587);

        // Set credentials if required
        smtpClient.UseDefaultCredentials = false;
        smtpClient.Credentials = new NetworkCredential("hand3c23@mbjcomp.org.il", "Gitty9565");
        smtpClient.EnableSsl = true;

        // Create the email message
        var message = new MailMessage();
        message.From = new MailAddress("hand3c23@mbjcomp.org.il");
        message.To.Add(emailAddress);
        message.Subject = "Welcome to our platform!";
        message.Body = "Thank you for signing up.";
        message.IsBodyHtml = true;

        // Send the email asynchronously
        await smtpClient.SendMailAsync(message);
    }

    public async Task SendEmailAsync(string to, string subject, string body)
    {
        var message = new MailMessage();
        message.From = new MailAddress("hand3c23@mbjcomp.org.il");
        message.To.Add(to);
        message.Subject = subject;
        message.Body = body;
        message.IsBodyHtml = true;

        using var smtpClient = new SmtpClient("smtp.office365.com", 587);
        smtpClient.UseDefaultCredentials = false;
        smtpClient.Credentials = new NetworkCredential("hand3c23@mbjcomp.org.il", "Gitty9565");
        smtpClient.EnableSsl = true;

        await smtpClient.SendMailAsync(message);
    }
}
