using System;
using System.Linq;
using ClanManager.Data;
using ClanManager.Models;
using ClanManager.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;

namespace ClanManager.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        private readonly ClanManagerDbContext Context;
        private readonly ILogger<AuthController> _logger;
        private readonly IUserService UserService;
        public AuthController(ILogger<AuthController> logger, ClanManagerDbContext context, IUserService userService)
        {
            _logger = logger;
            Context = context;
            UserService = userService;
        }
        public class Credentials
        {
            public string Email { get; set; }
            public string Password { get; set; }
            public bool RememberMe { get; set; }
        }

        public IList<AuthenticationScheme> ExternalLogins { get; set; }

        public string ReturnUrl { get; set; }

        [TempData]
        public string ErrorMessage { get; set; }

        public class EmailCheck
        {
            public string Email;
        }
        [HttpPost]
        public IActionResult CheckEmail([FromBody]EmailCheck Input)
        {
            List<User> User = Context.Users.Where(u => u.Email == Input.Email).ToList();
            return Ok(new { isTaken = User.Count > 0 });
        }


        [HttpPost]
        public IActionResult Register([FromBody]User User)
        {
            _logger.LogInformation("Registering.");
            if (ModelState.IsValid)
            {
                PasswordHasher<User> Hasher = new PasswordHasher<User>();
                string HashedPw = Hasher.HashPassword(User, User.Password);
                User.Password = HashedPw;
                Context.Users.Add(User);
                Context.SaveChanges();
                HttpContext.Session.SetInt32("UserId", User.Id);

                User.Token = UserService.GenerateToken(User.Id);
                User.Password = null;
                return Ok(new { user = User });
            }
            else
            {
                return Ok(new Exception("You fucked something up"));
            }
        }

        [HttpPost]
        public IActionResult Login([FromBody]Credentials Input)
        {
            if (ModelState.IsValid)
            {

                object Authorized = UserService.Authenticate(Input.Email, Input.Password);

                if (Authorized is User)
                {
                    User User = (User)Authorized;
                    HttpContext.Session.SetInt32("UserId", User.Id);
                    _logger.LogInformation("User logged in");
                    return Ok(new { user = User });

                }
                else return BadRequest(new { message = (string)Authorized });
            }
            return BadRequest(new { message = ErrorMessage });
        }
        public class Token
        {
            public string token;
            public string userId;
        };

        [HttpPost]
        public IActionResult CheckAuth([FromBody]AppSettings Settings)
        {
            if (HttpContext.Session.GetInt32("UserId") != null)
            {
                return Ok(new { user = Context.Users.Where(u => u.Id == (int)HttpContext.Session.GetInt32("UserId")).Single() });
            }
            else
            {
                return BadRequest(new { message = "User not logged in" });
            }
        }
        [HttpPost]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return Ok(new { message = "Successfully logged out" });
        }
    }

}