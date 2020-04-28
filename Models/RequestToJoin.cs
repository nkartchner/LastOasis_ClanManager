using System;
using System.ComponentModel.DataAnnotations;

namespace ClanManager.Models
{
    public class RequestToJoin
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Reason { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

        [Required]
        public int ClanId { get; set; }
        public Clan Clan { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}