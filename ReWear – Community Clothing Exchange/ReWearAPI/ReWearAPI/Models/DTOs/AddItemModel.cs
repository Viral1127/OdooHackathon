namespace ReWearAPI.Models.DTOs
{
    public class AddItemModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Type { get; set; }
        public string Size { get; set; }
        public string Condition { get; set; }
        public string Tags { get; set; }
        public int PointCost { get; set; } = 50; // Default point cost
        public List<string> ImageUrls { get; set; } // store base64 or URLs
    }
}
