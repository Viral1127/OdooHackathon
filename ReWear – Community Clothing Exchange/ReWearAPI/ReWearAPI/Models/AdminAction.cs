namespace ReWearAPI.Models
{
    public class AdminAction
    {
        public int ActionID { get; set; }
        public int AdminID { get; set; }
        public int ItemID { get; set; }
        public string ActionType { get; set; }
        public string Notes { get; set; }
        public DateTime ActionDate { get; set; } = DateTime.Now;

        public User Admin { get; set; }
        public Item Item { get; set; }
    }
}
