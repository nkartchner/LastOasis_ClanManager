using ClanManager.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ClanManager.Data
{
    public class ClanManagerDbContext : DbContext
    {
        public ClanManagerDbContext(DbContextOptions options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder Builder)
        {
            base.OnModelCreating(Builder);

            Builder.Entity<User>()
                  .Property(u => u.CreatedAt)
                  .HasDefaultValueSql("getutcdate()");

            Builder.Entity<Post>()
                  .Property(u => u.CreatedAt)
                  .HasDefaultValueSql("getutcdate()");

            Builder.Entity<RequestToJoin>()
                  .Property(u => u.CreatedAt)
                  .HasDefaultValueSql("getutcdate()");

            Builder.Entity<Notification>()
                  .Property(u => u.CreatedAt)
                  .HasDefaultValueSql("getutcdate()");

            Builder.Entity<Clan>()
                   .Property(b => b.UpdatedAt)
                   .HasDefaultValueSql("getutcdate()");


            Builder.Entity<Clan>()
                   .Property(b => b.CreatedAt)
                   .HasDefaultValueSql("getutcdate()");

            Builder.Entity<Clan>()
                   .HasMany<Allegiance>()
                   .WithOne(a => a.OtherClan)
                   .HasForeignKey(a => a.ClanId_2)
                   .OnDelete(DeleteBehavior.Restrict);

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Clan> Clans { get; set; }
        public DbSet<Allegiance> Allegiances { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<RequestToJoin> Requests { get; set; }
        public DbSet<Notification> Notifications { get; set; }

    }
}
