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
    public class RedemptionController : ControllerBase
    {
        private readonly ReWearDbContext _context;

        public RedemptionController(ReWearDbContext context)
        {
            _context = context;
        }

        [HttpPost("redeem")]
        [Authorize]
        public async Task<IActionResult> RedeemItem([FromBody] RedeemItemModel model)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
                return Unauthorized();

            int userId = int.Parse(userIdClaim);

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return NotFound(new { message = "User not found." });

            var item = await _context.Items.FindAsync(model.ItemID);
            if (item == null || !item.IsAvailable)
                return BadRequest(new { message = "Item not available for redemption." });

            if (item.UserID == userId)
                return BadRequest(new { message = "You cannot redeem your own item." });

            int cost = item.PointCost;

            if (user.Points < cost)
                return BadRequest(new { message = "You don’t have enough points." });

            user.Points -= cost;
            item.IsAvailable = false;

            var redemption = new Redemption
            {
                RedeemerID = userId,
                ItemID = item.ItemID,
                PointsUsed = cost,
                Status = "Completed"
            };

            _context.Redemptions.Add(redemption);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Item redeemed successfully." });
        }

        [HttpGet("mine")]
        [Authorize]
        public async Task<IActionResult> GetMyRedemptions()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
                return Unauthorized();

            int userId = int.Parse(userIdClaim);

            var redemptions = await _context.Redemptions
                .Include(r => r.Item)
                .Where(r => r.RedeemerID == userId)
                .OrderByDescending(r => r.CreatedAt)
                .Select(r => new
                {
                    r.RedemptionID,
                    r.PointsUsed,
                    r.Status,
                    r.CreatedAt,
                    Item = new
                    {
                        r.Item.ItemID,
                        r.Item.Title,
                        r.Item.PointCost,
                        ImagePaths = r.Item.ItemImages.Select(img => img.ImagePath).ToList()
                    }
                })
                .ToListAsync();

            return Ok(redemptions);
        }

        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllRedemptions()
        {
            var redemptions = await _context.Redemptions
                .Include(r => r.Item)
                .Include(r => r.Redeemer)
                .OrderByDescending(r => r.CreatedAt)
                .Select(r => new
                {
                    r.RedemptionID,
                    r.PointsUsed,
                    r.Status,
                    r.CreatedAt,
                    Redeemer = new { r.Redeemer.UserID, r.Redeemer.FullName, r.Redeemer.Email },
                    Item = new { r.Item.ItemID, r.Item.Title }
                })
                .ToListAsync();

            return Ok(redemptions);
        }

        [HttpPut("status/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateRedemptionStatus(int id, [FromBody] string newStatus)
        {
            var redemption = await _context.Redemptions.FindAsync(id);
            if (redemption == null)
                return NotFound(new { message = "Redemption not found." });

            redemption.Status = newStatus;
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Redemption status updated to {newStatus}" });
        }

        [HttpGet("redeemable-items")]
        [Authorize]
        public async Task<IActionResult> GetRedeemableItems()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
                return Unauthorized();

            int userId = int.Parse(userIdClaim);

            var items = await _context.Items
                .Include(i => i.ItemImages)
                .Where(i => i.IsAvailable && i.UserID != userId)
                .Select(i => new
                {
                    i.ItemID,
                    i.Title,
                    i.Description,
                    i.PointCost,
                    i.Tags,
                    i.Size,
                    i.Condition,
                    i.Type,
                    i.Category,
                    i.CreatedAt,
                    ImagePaths = i.ItemImages.Select(img => img.ImagePath).ToList()
                })
                .ToListAsync();

            return Ok(items);
        }





    }
}
