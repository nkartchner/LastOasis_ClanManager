using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClanManager.Models
{
    public class Roles
    {
        public string Visitor { get; } = "Visitor";
        public string Solo { get; } = "Solo";
        public string Founder { get; } = "Founder";
        public string Leader { get; } = "Leader";
        public string Officer { get; } = "Officer";
        public string Member { get; } = "Member";
    }
    public class Clan
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Color { get; set; }

        [Required]
        public string Flag { get; set; }

        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public List<User> Members { get; set; }
        public List<RequestToJoin> Requests { get; set; }
        public List<Allegiance> Allegiances { get; set; }

        [NotMapped]
        public static Roles Roles = new Roles();
    }
}