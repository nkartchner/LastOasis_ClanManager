using System.Collections.Generic;
using System.Text.Json;
using System.Linq;
using ClanManager.Data;
using ClanManager.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System;
using ClanManager.Controllers.Authorization;

namespace ClanManager.Controllers
{
    [ClanManagerAuth]
    [ApiController]
    [Route("api/[controller]")]
    public class ClanController : ControllerBase
    {
        private ClanManagerDbContext Context;
        public ClanController(ClanManagerDbContext context)
        {
            Context = context;
        }

        [HttpPost("[action]")]
        public IActionResult New([FromBody]Clan NewClan)
        {
            int? UserId = HttpContext.Session.GetInt32("UserId");
            if (UserId != null)
            {
                User User = Context.Users.Where(u => u.Id == UserId).Single();
                Context.Clans.Add(NewClan);
                Context.SaveChanges();

                User.ClanId = NewClan.Id;
                User.Role = Clan.Roles.Founder;
                Context.Users.Update(User);
                Context.SaveChanges();
                return Ok(NewClan);
            }
            else
            {
                return Ok(new Exception("You are not logged in"));
            }
        }

        [HttpGet("[action]")]
        public IEnumerable<Clan> All() => Context.Clans.Include(c => c.Allegiances).Include(c => c.Members).ToList();

        [HttpGet("{clanId}")]
        public IActionResult Get(int clanId)
        {
            Clan Clan = Context.Clans
                .Where(c => c.Id == clanId)
                .Include(c => c.Members)
                .Include(c => c.Allegiances)
                .ThenInclude(a => a.OtherClan)
                .Include(c => c.Requests)
                .ThenInclude(r => r.User)
                .Single();

            var Members = Clan.Members.Select(u => new
            {
                firstName = u.FirstName,
                lastName = u.LastName,
                role = u.Role,
                clanId = u.ClanId,
                id = u.Id,
            });

            var Requests = Clan.Requests.Select(req =>
            new
            {
                id = req.Id,
                reason = req.Reason,
                createdAt = req.CreatedAt,
                userId = req.UserId,
                user = new
                {
                    ClanId = req.User.ClanId,
                    FirstName = req.User.FirstName,
                    LastName = req.User.LastName,
                    Email = req.User.Email,
                    Id = req.User.Id
                }
            });

            return Ok(new
            {
                id = Clan.Id,
                name = Clan.Name,
                allegiances = Clan.Allegiances,
                color = Clan.Color,
                createdAt = Clan.CreatedAt,
                members = Members,
                flag = Clan.Flag,
                description = Clan.Description,
                requests = Requests
            });
        }

        [HttpDelete("[action]/{clanId}")]
        public IActionResult Delete([FromRoute]int clanId)
        {
            User User = Context.Users.Where(u => u.Id == (int)HttpContext.Session.GetInt32("UserId")).Single();
            User.Role = null;
            User.ClanId = null;
            Clan Clan = Context.Clans.Where(c => c.Id == clanId).Include(c => c.Members).Single();
            if (Clan != null && User != null)
            {
                Clan.Members.ForEach(Member =>
                {
                    Member.ClanId = null;
                });
                Context.Clans.Remove(Clan);
                Context.Update(User);
                Context.SaveChanges();
            }
            return Ok(new { message = "Deleted Clan Successfully" });
        }

        [HttpPost("[action]")]
        public IActionResult Leave()
        {
            User User = Context.Users.Where(u => u.Id == (int)HttpContext.Session.GetInt32("UserId")).Single();
            User.Role = null;
            User.ClanId = null;
            Context.Update(User);
            Context.SaveChanges();
            return Ok(new { message = "Operation Successfull" });
        }

        [HttpPost("{ClanId}/[action]")]
        public IActionResult Join([FromRoute]int ClanId, [FromBody]RequestToJoin Form)
        {
            int UserId = (int)HttpContext.Session.GetInt32("UserId");
            User User = Context.Users.Where(u => u.Id == UserId).Single();
            Form.CreatedAt = DateTime.Now;
            Context.Requests.Add(Form);
            Context.SaveChanges();
            List<RequestToJoin> CurrentRequests = Context.Requests.Where(req => req.UserId == UserId && req.Id != Form.Id).ToList();
            CurrentRequests.ForEach(Request =>
            {
                Context.Requests.Remove(Request);
            });
            Context.SaveChanges();
            Form.User = User;
            return Ok(Form);
        }

        [HttpPost("{RequestId}/[action]")]
        public IActionResult Cancel([FromRoute]int RequestId)
        {
            RequestToJoin Request = Context.Requests.Where(req => req.Id == RequestId).Single();
            Context.Requests.Remove(Request);
            Context.SaveChanges();
            return Ok();
        }

        [HttpGet("{ClanId}/[action]")]
        public IActionResult Requests([FromRoute]int ClanId)
        {
            List<RequestToJoin> Requests = Context.Requests.Where(r => r.ClanId == ClanId).Include(r => r.User).ToList();
            Requests.ForEach(req => req.User.Password = null);
            return Ok(new { requests = Requests.ToArray() });
        }

        [HttpPost("{RequestId}/[action]")]
        public IActionResult Accept([FromRoute]int RequestId)
        {
            RequestToJoin Request = Context.Requests.Where(req => req.Id == RequestId).Include(r => r.Clan).Single();
            User UserBeingAccepted = Context.Users.Where(user => user.Id == Request.UserId).Single();
            Notification NewNote = new Notification()
            {
                Text = $"You have been Accepted into {Request.Clan.Name}!",
                Type = NotificationType.GENERAL,
                Unread = true,
                UserId = Request.UserId
            };
            UserBeingAccepted.ClanId = Request.ClanId;
            UserBeingAccepted.Role = Clan.Roles.Member;
            Context.Notifications.Add(NewNote);
            Context.SaveChanges();
            Context.Users.Update(UserBeingAccepted);
            Context.SaveChanges();
            Context.Requests.Remove(Request);
            Context.SaveChanges();

            return Ok();
        }

        [HttpPost("{RequestId}/[action]")]
        public IActionResult Deny([FromRoute]int RequestId)
        {
            RequestToJoin Request = Context.Requests.Where(req => req.Id == RequestId).Include(req => req.Clan).Single();
            Notification NewNote = new Notification()
            {
                Text = $"Your request to join {Request.Clan.Name} has been denied",
                Type = NotificationType.GENERAL,
                Unread = true,
                UserId = Request.UserId
            };
            Context.Notifications.Add(NewNote);
            Context.Requests.Remove(Request);
            Context.SaveChanges();

            return Ok();
        }

        [HttpGet("[action]/{Name}")]
        public IActionResult Search([FromRoute]string Name) => Ok(Context.Clans.Where(c => c.Name.Contains(Name)).ToList());

    }
}