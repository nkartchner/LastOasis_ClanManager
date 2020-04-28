using System.Collections.Generic;
using System.Linq;
using ClanManager.Models;

namespace ClanManager.Helpers
{
    public static class ExtensionMethods
    {
        public static IEnumerable<User> WithoutPasswords(this IEnumerable<User> users)
        {
            return users.Select(user => user.WithoutPassword());
        }

        public static User WithoutPassword(this User User)
        {
            User.Password = null;
            return User;
        }
    }
}