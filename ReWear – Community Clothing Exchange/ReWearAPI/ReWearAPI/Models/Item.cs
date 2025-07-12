namespace ReWearAPI.Models
{
    public class Item
    {
        public int ItemID { get; set; }
        public int UserID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Type { get; set; }
        public string Size { get; set; }
        public string Condition { get; set; }
        public string Tags { get; set; }
        public int PointCost { get; set; } = 50;
        public bool IsAvailable { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public User User { get; set; }
        public ICollection<ItemImage> ItemImages { get; set; }
        public ICollection<Swap> RequestedSwaps { get; set; }
        public ICollection<Swap> OfferedSwaps { get; set; }
        public ICollection<Redemption> Redemptions { get; set; }
        public ICollection<AdminAction> AdminActions { get; set; }
    }
}
