using System.Text.Json;
using System.Linq;
using ClanManager.Data;
using ClanManager.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using ClanManager.Controllers.Authorization;
using System;

namespace ClanManager.Controllers
{
    [ClanManagerAuth]
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private ClanManagerDbContext Context;
        public PostController(ClanManagerDbContext context)
        {
            Context = context;
        }

        [HttpGet]
        public IActionResult Get() => Ok(new { notifications = Context.Notifications.Where(n => n.UserId == (int)HttpContext.Session.GetInt32("UserId")).ToList() });

        [HttpPost]
        public IActionResult New([FromBody]Post Post)
        {
            Post.CreatedAt = DateTime.Now;
            Post.UpdatedAt = DateTime.Now;
            Post.UserId = (int)HttpContext.Session.GetInt32("UserId");
            Context.Posts.Add(Post);
            Context.SaveChanges();
            return Ok(Post);
        }

        [HttpDelete("{PostId}")]
        public IActionResult Delete([FromRoute]int PostId)
        {
            Post post = Context.Posts.Where(p => p.Id == PostId).Single();

            Context.Posts.Remove(post);
            Context.SaveChanges();

            return Ok(new { message = "Post removed successfully" });
        }

        [HttpGet("clan/{ClanId}")]
        public IActionResult GetClanPosts([FromRoute]int ClanId) => Ok(Context.Posts.Where(p => p.ClanId == ClanId).ToList());

        [HttpPut("[action]/{PostId}")]
        public IActionResult Update([FromRoute]int PostId, [FromBody]Post Model)
        {
            Model.UpdatedAt = DateTime.Now;
            Context.Posts.Update(Model);
            Context.SaveChanges();
            return Ok(Model);
        }
    }
}