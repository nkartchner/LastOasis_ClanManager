using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ClanManager.Models;
using ClanManager.Helpers;
using ClanManager.Data;
using Microsoft.AspNetCore.Identity;

namespace ClanManager.Services
{
    public interface IUserService
    {
        object Authenticate(string Email, string Password);
        string GenerateToken(int UserId);
        IEnumerable<User> GetAll();
    }
    public class UserService : IUserService
    {
        private readonly AppSettings AppSettings;
        private readonly ClanManagerDbContext Db;
        public UserService(IOptions<AppSettings> appSettings, ClanManagerDbContext db)
        {
            AppSettings = appSettings.Value;
            Db = db;
        }
        public string GenerateToken(int UserId)
        {
            JwtSecurityTokenHandler Jwt = new JwtSecurityTokenHandler();
            byte[] Key = Encoding.ASCII.GetBytes(AppSettings.Secret);

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] { new Claim(ClaimTypes.Name, UserId.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Key), SecurityAlgorithms.HmacSha256Signature)
            };
            SecurityToken Token = Jwt.CreateToken(tokenDescriptor);

            return Jwt.WriteToken(Token);
        }
        public object Authenticate(string Email, string Password)
        {

            User User = Db.Users.Where(user => user.Email == Email).FirstOrDefault();
            if (User is null) return "No user found";

            PasswordHasher<User> Validator = new PasswordHasher<User>();
            PasswordVerificationResult Result = Validator.VerifyHashedPassword(User, User.Password, Password);

            if (Result is 0) return "Invalid username or password";

            User.Token = GenerateToken(User.Id);
            return User.WithoutPassword();
        }

        public IEnumerable<User> GetAll() => Db.Users.ToList().Select(user => user.WithoutPassword());

    }
}