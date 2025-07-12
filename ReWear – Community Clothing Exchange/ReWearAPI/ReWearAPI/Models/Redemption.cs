namespace ReWearAPI.Models
{
    public class Redemption
    {
        public int RedemptionID { get; set; }
        public int RedeemerID { get; set; }
        public int ItemID { get; set; }
        public int PointsUsed { get; set; }
        public string Status { get; set; } = "Pending";
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public User Redeemer { get; set; }
        public Item Item { get; set; }
    }
}
