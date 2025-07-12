using Microsoft.EntityFrameworkCore;
using ReWearAPI.Models;

namespace ReWearAPI.Data
{
    public class ReWearDbContext : DbContext
    {
        public ReWearDbContext(DbContextOptions<ReWearDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<ItemImage> ItemImages { get; set; }
        public DbSet<Swap> Swaps { get; set; }
        public DbSet<Redemption> Redemptions { get; set; }
        public DbSet<AdminAction> AdminActions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Swap>()
                .HasOne(s => s.Requester)
                .WithMany(u => u.RequestedSwaps)
                .HasForeignKey(s => s.RequesterID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Swap>()
                .HasOne(s => s.RequestedItem)
                .WithMany(i => i.RequestedSwaps)
                .HasForeignKey(s => s.RequestedItemID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Swap>()
                .HasOne(s => s.OfferedItem)
                .WithMany(i => i.OfferedSwaps)
                .HasForeignKey(s => s.OfferedItemID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<AdminAction>()
                .HasKey(a => a.ActionID); // Optional (EF detects this automatically)

            modelBuilder.Entity<AdminAction>()
                .HasOne(a => a.Admin)
                .WithMany(u => u.AdminActions)
                .HasForeignKey(a => a.AdminID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<AdminAction>()
                .HasOne(a => a.Item)
                .WithMany(i => i.AdminActions)
                .HasForeignKey(a => a.ItemID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Redemption>()
                .HasOne(r => r.Redeemer)
                .WithMany(u => u.Redemptions)
                .HasForeignKey(r => r.RedeemerID);

            modelBuilder.Entity<Redemption>()
                .HasOne(r => r.Item)
                .WithMany(i => i.Redemptions)
                .HasForeignKey(r => r.ItemID);

        }
    }
}
