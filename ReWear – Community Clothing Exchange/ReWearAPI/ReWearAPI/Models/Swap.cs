namespace ReWearAPI.Models
{
    public class Swap
    {
        public int SwapID { get; set; }
        public int RequesterID { get; set; }
        public int RequestedItemID { get; set; }
        public int OfferedItemID { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public User Requester { get; set; }
        public Item RequestedItem { get; set; }
        public Item OfferedItem { get; set; }
    }
}
