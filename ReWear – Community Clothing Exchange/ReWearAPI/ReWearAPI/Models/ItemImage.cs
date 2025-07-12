using System.ComponentModel.DataAnnotations;

namespace ReWearAPI.Models
{
    public class ItemImage
    {
        [Key]
        public int ImageID { get; set; }
        public int ItemID { get; set; }
        public string ImagePath { get; set; }

        public Item Item { get; set; }
    }
}
