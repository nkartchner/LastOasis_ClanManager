using System.Text.Json;
using System.Collections.Generic;
using System.Linq;
using ClanManager.Data;
using ClanManager.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.AspNetCore.Http;
using ClanManager.Controllers.Authorization;
using Microsoft.AspNetCore.Identity;

namespace ClanManager.Controllers
{
    [ClanManagerAuth]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        public class UserForm
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public int Id { get; set; }
        }
        private ClanManagerDbContext Context;
        public UserController(ClanManagerDbContext context)
        {
            Context = context;
        }

        [HttpGet("[action]")]
        public IEnumerable<User> All() => Context.Users.Include(u => u.Clan).ToList();

        [HttpGet]
        public IActionResult Get()
        {
            int? UserId = HttpContext.Session.GetInt32("UserId");
            if (UserId != null)
            {
                User User = Context.Users.Where(u => u.Id == (int)UserId).Single();
                string Json = JsonSerializer.Serialize(new
                {
                    firstName = User.FirstName,
                    lastName = User.LastName,
                    clanId = User.ClanId,
                    id = User.Id,
                    email = User.Email,
                });
                return Ok(Json);
            }
            else return Ok(new UnauthorizedAccessException("Not logged in"));

        }
        [HttpPost("[action]")]
        public IActionResult Update([FromBody]UserForm UpdateUser)
        {
            User User = Context.Users.Where(u => u.Id == (int)HttpContext.Session.GetInt32("UserId")).Single();
            User.FirstName = UpdateUser.FirstName;
            User.LastName = UpdateUser.LastName;
            User.Email = UpdateUser.Email;
            Context.Users.Update(User);
            Context.SaveChanges();
            User.Password = null;
            return Ok(User);
        }
        [HttpPost("[action]")]
        public IActionResult UpdatePW([FromBody]User User)
        {
            if (ModelState.IsValid)
            {
                PasswordHasher<User> Hasher = new PasswordHasher<User>();
                User.Password = Hasher.HashPassword(User, User.Password);
                Context.Users.Update(User);
                Context.SaveChanges();
                User.Password = null;
                return Ok(User);
            }
            else return BadRequest("Something went wrong");
        }

        [HttpPut("{UserId}/[action]")]
        public IActionResult UpdateRole([FromRoute]int UserId, [FromBody] dynamic Role)
        {
            User User = Context.Users.Where(u => u.Id == UserId).Single();
            if (User != null)
            {
                User.Role = Role.role;
            }
            Context.Users.Update(User);
            Context.SaveChanges();
            return Ok();
        }
        [HttpPut("{UserId}/[action]")]
        public IActionResult RemoveClan([FromRoute]int UserId)
        {
            User User = Context.Users.Where(u => u.Id == UserId).Single();
            if (User != null)
            {
                User.ClanId = null;
                User.Role = Clan.Roles.Solo;
            }
            Context.Users.Update(User);
            Context.SaveChanges();
            return Ok();
        }

    }

}