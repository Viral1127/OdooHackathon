namespace ReWearAPI.Models
{
    public class User
    {
        public int UserID { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public int Points { get; set; } = 0;
        public string ProfileImage { get; set; }
        public string Role { get; set; } = "User";
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public ICollection<Item> Items { get; set; }
        public ICollection<Swap> RequestedSwaps { get; set; }
        public ICollection<Redemption> Redemptions { get; set; }
        public ICollection<AdminAction> AdminActions { get; set; }
        public ICollection<Testimonial> Testimonials { get; set; }
    }
}
