namespace ReWearAPI.Models
{
    public class Testimonial
    {
        public int TestimonialID { get; set; }
        public int UserID { get; set; }
        public string Message { get; set; }
        public int Rating { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public User User { get; set; }
    }
}
