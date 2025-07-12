using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReWearAPI.Data;
using ReWearAPI.Models.DTOs;
using ReWearAPI.Models;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class SwapController : ControllerBase
{
    private readonly ReWearDbContext _context;

    public SwapController(ReWearDbContext context)
    {
        _context = context;
    }

    [HttpPost("request")]
    [Authorize]
    public async Task<IActionResult> RequestSwap([FromBody] SwapRequestModel model)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim))
            return Unauthorized(new { message = "Invalid token." });

        int userId = int.Parse(userIdClaim);

        // Check both items exist and are available
        var requestedItem = await _context.Items.FindAsync(model.RequestedItemID);
        var offeredItem = await _context.Items.FindAsync(model.OfferedItemID);

        if (requestedItem == null || offeredItem == null || !requestedItem.IsAvailable || !offeredItem.IsAvailable)
            return BadRequest(new { message = "Invalid or unavailable items." });

        if (offeredItem.UserID != userId)
            return Forbid("You can only offer your own item.");

        if (requestedItem.UserID == userId)
            return BadRequest(new { message = "You can't request your own item." });

        // Create swap
        var swap = new Swap
        {
            RequesterID = userId,
            RequestedItemID = model.RequestedItemID,
            OfferedItemID = model.OfferedItemID,
            Status = "Pending"
        };

        _context.Swaps.Add(swap);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Swap request sent.", swapId = swap.SwapID });
    }

    [HttpGet("incoming")]
    [Authorize]
    public IActionResult GetIncomingSwapRequests()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim)) return Unauthorized();

        int userId = int.Parse(userIdClaim);

        var swaps = _context.Swaps
            .Include(s => s.RequestedItem)
            .Include(s => s.OfferedItem)
            .Include(s => s.Requester)
            .Where(s => s.RequestedItem.UserID == userId)
            .Select(s => new
            {
                s.SwapID,
                s.Status,
                s.CreatedAt,
                Requester = new
                {
                    s.Requester.FullName,
                    s.Requester.Email
                },
                OfferedItem = new
                {
                    s.OfferedItem.ItemID,
                    s.OfferedItem.Title
                },
                RequestedItem = new
                {
                    s.RequestedItem.ItemID,
                    s.RequestedItem.Title
                }
            })
            .ToList();

        return Ok(swaps);
    }

    [HttpGet("my-requests")]
    [Authorize]
    public IActionResult GetMySwapRequests()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim)) return Unauthorized();

        int userId = int.Parse(userIdClaim);

        var swaps = _context.Swaps
            .Include(s => s.RequestedItem)
            .Include(s => s.OfferedItem)
            .Where(s => s.RequesterID == userId)
            .Select(s => new
            {
                s.SwapID,
                s.Status,
                s.CreatedAt,
                OfferedItem = new
                {
                    s.OfferedItem.ItemID,
                    s.OfferedItem.Title
                },
                RequestedItem = new
                {
                    s.RequestedItem.ItemID,
                    s.RequestedItem.Title
                }
            })
            .ToList();

        return Ok(swaps);
    }

    [HttpPut("respond/{id}")]
    [Authorize]
    public async Task<IActionResult> RespondToSwap(int id, [FromBody] SwapResponseModel model)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim)) return Unauthorized();

        int userId = int.Parse(userIdClaim);

        var swap = await _context.Swaps
            .Include(s => s.RequestedItem)
            .Include(s => s.OfferedItem)
            .FirstOrDefaultAsync(s => s.SwapID == id);

        if (swap == null) return NotFound(new { message = "Swap request not found." });

        // Only owner of the requested item can respond
        if (swap.RequestedItem.UserID != userId)
            return Forbid("You are not authorized to respond to this swap request.");

        if (swap.Status != "Pending")
            return BadRequest(new { message = "This request is already responded to." });

        if (model.Status != "Accepted" && model.Status != "Rejected")
            return BadRequest(new { message = "Invalid status. Use Accepted or Rejected." });

        swap.Status = model.Status;

        if (model.Status == "Accepted")
        {
            // Mark both items as unavailable
            swap.RequestedItem.IsAvailable = false;
            swap.OfferedItem.IsAvailable = false;
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = $"Swap request {model.Status.ToLower()}." });
    }

    [HttpGet("history")]
    [Authorize]
    public IActionResult GetSwapHistory()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim)) return Unauthorized();

        int userId = int.Parse(userIdClaim);

        var swaps = _context.Swaps
            .Include(s => s.RequestedItem)
            .Include(s => s.OfferedItem)
            .Include(s => s.Requester)
            .Where(s =>
                s.Status == "Accepted" &&
                (s.RequestedItem.UserID == userId || s.RequesterID == userId)
            )
            .Select(s => new
            {
                s.SwapID,
                s.Status,
                s.CreatedAt,
                OfferedItem = new
                {
                    s.OfferedItem.ItemID,
                    s.OfferedItem.Title,
                    s.OfferedItem.UserID
                },
                RequestedItem = new
                {
                    s.RequestedItem.ItemID,
                    s.RequestedItem.Title,
                    s.RequestedItem.UserID
                },
                Requester = new
                {
                    s.Requester.UserID,
                    s.Requester.FullName,
                    s.Requester.Email
                }
            })
            .ToList();

        return Ok(swaps);
    }

    [HttpPost("complete/{swapId}")]
    [Authorize(Roles = "Admin,User")]
    public async Task<IActionResult> CompleteSwap(int swapId)
    {
        var swap = await _context.Swaps
            .Include(s => s.RequestedItem)
            .Include(s => s.OfferedItem)
            .FirstOrDefaultAsync(s => s.SwapID == swapId);

        if (swap == null)
            return NotFound(new { message = "Swap not found." });

        if (swap.Status == "Completed")
            return BadRequest(new { message = "Swap is already completed." });

        // ✅ Mark swap as completed
        swap.Status = "Completed";

        // ✅ Give points to both requester and owner
        var requester = await _context.Users.FindAsync(swap.RequesterID);
        var owner = await _context.Users.FindAsync(swap.RequestedItem?.UserID);

        if (requester != null) requester.Points += 50;
        if (owner != null) owner.Points += 50;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Swap completed and points rewarded." });
    }




}