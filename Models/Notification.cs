using System;
using System.ComponentModel.DataAnnotations;

namespace ClanManager.Models
{
    public enum NotificationType
    {
        CLAN,
        MESSAGE,
        GENERAL
    }
    public class Notification
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Text { get; set; }
        [Required]
        public NotificationType Type { get; set; }
        public bool Unread { get; set; }
        public DateTime CreatedAt { get; set; }

        [Required]
        public int UserId { get; set; }
        public User User { get; set; }
    }
}