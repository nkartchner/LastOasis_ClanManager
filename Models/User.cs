using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ClanManager.Data.Attributes;

namespace ClanManager.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "First Name is required. ")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is required. ")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Email is required. ")]
        [EmailAddress(ErrorMessage = "Email is not a valid email address. ")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required. ")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public string Role { get; set; }
        public DateTime CreatedAt { get; }
        public int? ClanId { get; set; }
        public Clan Clan { get; set; }

        [NotMapped]
        [Compare("Password", ErrorMessage = "Passwords do not match")]
        public string ConfirmPassword { get; set; }
        [NotMapped]
        public string Token { get; set; }

        // public static User WithoutPassword(this User user)
        // {
        //     user.Password = null;
        //     return user;
        // }
    }
}
