using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReWearAPI.Data;
using ReWearAPI.Models;
using ReWearAPI.Models.DTOs;
using System.Security.Claims;

namespace ReWearAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly ReWearDbContext _context;

        public ItemController(ReWearDbContext context)
        {
            _context = context;
        }

        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> AddItem([FromBody] AddItemModel model)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim))
                return Unauthorized(new { message = "Invalid or missing token." });

            int userId = int.Parse(userIdClaim);

            var newItem = new Item
            {
                UserID = userId,
                Title = model.Title,
                Description = model.Description,
                Category = model.Category,
                Type = model.Type,
                Size = model.Size,
                Condition = model.Condition,
                Tags = model.Tags,
                CreatedAt = DateTime.Now,
                IsAvailable = true,
                ItemImages = model.ImageUrls?.Select(url => new ItemImage
                {
                    ImagePath = url
                }).ToList(),
                PointCost = 50 // Set default point cost here if needed
            };

            _context.Items.Add(newItem);
            await _context.SaveChangesAsync();

            // ✅ Award points to the user
            var user = await _context.Users.FindAsync(userId);
            if (user != null)
            {
                user.Points += 30; // You can change to any value
                await _context.SaveChangesAsync(); // Save updated points
            }

            return Ok(new { message = "Item added successfully and 30 points awarded!", itemId = newItem.ItemID });
        }


        [HttpGet("all")]
        [AllowAnonymous]
        public IActionResult GetAllItems()
        {
            var items = _context.Items
                .Where(i => i.IsAvailable)
                .Select(i => new
                {
                    i.ItemID,
                    i.Title,
                    i.Description,
                    i.Category,
                    i.Type,
                    i.Size,
                    i.Condition,
                    i.Tags,
                    i.IsAvailable,
                    i.CreatedAt,
                    User = new
                    {
                        i.User.FullName,
                        i.User.Email
                    },
                    Images = i.ItemImages.Select(img => img.ImagePath)
                })
                .ToList();

            return Ok(items);
        }

        [HttpGet("{id}")]
        public IActionResult GetItemById(int id)
        {
            var item = _context.Items
                .Where(i => i.ItemID == id)
                .Select(i => new
                {
                    i.ItemID,
                    i.Title,
                    i.Description,
                    i.Category,
                    i.Type,
                    i.Size,
                    i.Condition,
                    i.Tags,
                    i.IsAvailable,
                    i.CreatedAt,
                    User = new
                    {
                        i.User.FullName,
                        i.User.Email
                    },
                    Images = i.ItemImages.Select(img => img.ImagePath)
                })
                .FirstOrDefault();

            if (item == null)
                return NotFound(new { message = "Item not found." });

            return Ok(item);
        }

        [HttpPut("update/{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateItem(int id, [FromBody] AddItemModel model)
        {
            var item = await _context.Items.Include(i => i.ItemImages).FirstOrDefaultAsync(i => i.ItemID == id);

            if (item == null)
                return NotFound(new { message = "Item not found." });

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || item.UserID != int.Parse(userIdClaim))
                return Unauthorized(new { message = "Not allowed to edit this item." });

            // ✅ Update fields
            item.Title = model.Title;
            item.Description = model.Description;
            item.Category = model.Category;
            item.Type = model.Type;
            item.Size = model.Size;
            item.Condition = model.Condition;
            item.Tags = model.Tags;

            // ✅ Update point cost
            item.PointCost = model.PointCost;

            // ✅ Update Images
            item.ItemImages.Clear();
            item.ItemImages = model.ImageUrls.Select(url => new ItemImage { ImagePath = url }).ToList();

            await _context.SaveChangesAsync();
            return Ok(new { message = "Item updated successfully." });
        }


        [HttpDelete("delete/{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null) return NotFound(new { message = "Item not found." });

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || item.UserID != int.Parse(userIdClaim))
                return Unauthorized(new { message = "Not allowed to delete this item." });

            item.IsAvailable = false;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Item deleted (hidden) successfully." });
        }

        [HttpGet("mine")]
        [Authorize]
        public IActionResult GetMyItems()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim)) return Unauthorized();

            int userId = int.Parse(userIdClaim);

            var items = _context.Items
                .Where(i => i.UserID == userId)
                .Select(i => new {
                    i.ItemID,
                    i.Title,
                    i.IsAvailable,
                    i.CreatedAt,
                    Image = i.ItemImages.Select(img => img.ImagePath).FirstOrDefault()
                })
                .ToList();

            return Ok(items);
        }




    }
}
