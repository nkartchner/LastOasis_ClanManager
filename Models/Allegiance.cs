using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClanManager.Models
{
    public enum FriendOrFo
    {
        ALLY,
        ENEMY
    }
    public class Allegiance
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public FriendOrFo AlliedOrNot { get; set; }

        public bool Pending { get; set; }
        public bool Accepted { get; set; }

        [Required]
        public int ClanId { get; set; }
        public Clan Clan { get; set; }

        [Required]
        public int ClanId_2 { get; set; }
        [ForeignKey("ClanId_2")]
        public Clan OtherClan { get; set; }
    }
}