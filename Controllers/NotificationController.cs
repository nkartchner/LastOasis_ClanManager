using System.Linq;
using ClanManager.Data;
using ClanManager.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using ClanManager.Controllers.Authorization;

namespace ClanManager.Controllers
{
    [ClanManagerAuth]
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        private ClanManagerDbContext Context;
        public NotificationController(ClanManagerDbContext context)
        {
            Context = context;
        }

        [HttpGet]
        public IActionResult Get() => Ok(new { notifications = Context.Notifications.Where(n => n.UserId == (int)HttpContext.Session.GetInt32("UserId")).ToList() });

        [HttpPost("{UserId}")]
        public IActionResult New([FromRoute]int UserId, [FromBody]string message)
        {
            Notification notification = new Notification()
            {
                Text = message,
                Type = NotificationType.GENERAL,
                UserId = UserId
            };
            Context.Notifications.Add(notification);
            Context.SaveChanges();
            return Ok(new { message = "Successfully added notification" });
        }
    }
}