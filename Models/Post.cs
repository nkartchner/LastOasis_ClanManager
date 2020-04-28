using System;
using System.ComponentModel.DataAnnotations;

namespace ClanManager.Models
{
    public class Post
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Content { get; set; }

        public string ImgUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        [Required]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required]
        public int ClanId { get; set; }
        public Clan Clan { get; set; }
    }
}