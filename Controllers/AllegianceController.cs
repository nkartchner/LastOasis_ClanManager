using System.Linq;
using System.Text.Json;
using ClanManager.Data;
using ClanManager.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;
using Microsoft.AspNetCore.Http;

namespace ClanManager.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AllegianceController : ControllerBase
    {
        private ClanManagerDbContext Context;
        public AllegianceController(ClanManagerDbContext context)
        {
            Context = context;
        }

        [HttpPost("[action]")]
        public IActionResult New([FromBody]Allegiance Model)
        {
            Clan RequestingClan = Context.Clans.Where(c => c.Id == Model.ClanId).Single();
            Clan RequesteeClan = Context.Clans.Where(c => c.Id == Model.ClanId_2).Single();
            if (RequesteeClan != null && RequestingClan != null)
            {
                Context.Allegiances.Add(Model);
                Context.SaveChanges();
                Notification NewNotification = new Notification()
                {
                    CreatedAt = DateTime.Now,
                    Text = $"{RequestingClan.Name} has requested and Alliance with you!",
                    Type = NotificationType.CLAN,
                    UserId = (int)HttpContext.Session.GetInt32("UserId"),
                    Unread = true,
                };
                Context.Notifications.Add(NewNotification);
                Context.SaveChanges();
                return Ok(Model);
            }
            else return BadRequest("Missing or Invalid ClanId(s)");
        }


        [HttpDelete("{AllegianceId}/[action]")]
        public IActionResult RemoveAllegiance([FromRoute]int AllegianceId)
        {
            Allegiance allegiance = Context.Allegiances.Where(a => a.Id == AllegianceId).Single();
            Context.Allegiances.Remove(allegiance);
            Context.SaveChanges();
            return Ok();
        }

        [HttpPut("{AllegianceId}/[action]")]
        public IActionResult Accept([FromRoute]int AllegianceId)
        {
            Allegiance Model = Context.Allegiances.Where(a => a.Id == AllegianceId).Single();
            Model.AlliedOrNot = FriendOrFo.ALLY;
            Model.Accepted = true;
            Model.Pending = false;
            Context.Allegiances.Update(Model);
            Context.SaveChanges();
            Clan RequestingClan = Context.Clans.Where(c => c.Id == Model.ClanId).Single();
            Clan RequesteeClan = Context.Clans.Where(c => c.Id == Model.ClanId_2).Single();
            User User = Context.Users.Where(u => u.ClanId == RequestingClan.Id && u.Role == Clan.Roles.Founder).Single();
            if (User != null)
            {

                Notification NewNotification = new Notification()
                {
                    CreatedAt = DateTime.Now,
                    Text = $"{RequesteeClan.Name} has accepted your alliance request!",
                    Type = NotificationType.CLAN,
                    UserId = User.Id,
                    Unread = true,
                };
                Context.Notifications.Add(NewNotification);
                Context.SaveChanges();
            }
            return Ok(Model);
        }
        [HttpPut("{AllegianceId}/[action]")]
        public IActionResult Deny([FromRoute]int AllegianceId)
        {
            Allegiance Model = Context.Allegiances.Where(a => a.Id == AllegianceId).Single();
            Model.AlliedOrNot = FriendOrFo.ENEMY;
            Model.Accepted = false;
            Model.Pending = false;
            Context.Allegiances.Update(Model);
            Context.SaveChanges();
            Clan RequestingClan = Context.Clans.Where(c => c.Id == Model.ClanId).Single();
            Clan RequesteeClan = Context.Clans.Where(c => c.Id == Model.ClanId_2).Single();
            User User = Context.Users.Where(u => u.ClanId == RequestingClan.Id && u.Role == Clan.Roles.Founder).Single();
            if (User != null)
            {

                Notification NewNotification = new Notification()
                {
                    CreatedAt = DateTime.Now,
                    Text = $"{RequesteeClan.Name} has denied your alliance request!",
                    Type = NotificationType.CLAN,
                    UserId = User.Id,
                    Unread = true,
                };
                Context.Notifications.Add(NewNotification);
                Context.SaveChanges();
            }
            return Ok(Model);
        }
        [HttpPut("{AllegianceId}/[action]")]
        public IActionResult MarkAsEnemy([FromRoute]int AllegianceId)
        {
            Allegiance Model = Context.Allegiances.Where(a => a.Id == AllegianceId).Single();
            if (Model != null)
            {
                Model.AlliedOrNot = FriendOrFo.ENEMY;
                Model.Accepted = false;
                Model.Pending = false;
                Context.Allegiances.Update(Model);
                Context.SaveChanges();
                Clan RequestingClan = Context.Clans.Where(c => c.Id == Model.ClanId).Single();
                Clan RequesteeClan = Context.Clans.Where(c => c.Id == Model.ClanId_2).Single();
                User User = Context.Users.Where(u => u.ClanId == RequestingClan.Id && u.Role == Clan.Roles.Founder).Single();
                if (User != null)
                {

                    Notification NewNotification = new Notification()
                    {
                        CreatedAt = DateTime.Now,
                        Text = $"{RequesteeClan.Name} has marked you as an enemy!",
                        Type = NotificationType.CLAN,
                        UserId = User.Id,
                        Unread = true,
                    };
                    Context.Notifications.Add(NewNotification);
                    Context.SaveChanges();
                }
            }
            return Ok(Model);
        }



    }
}