using Microsoft.AspNetCore.Mvc;
using ReWearAPI.Models;
using ReWearAPI.Services;

namespace ReWearAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var result = await _authService.RegisterAsync(model);
            if (result == "User already exists")
                return BadRequest(new { message = result });

            return Ok(new { message = result });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var result = await _authService.LoginAsync(model);
            if (result == "Invalid credentials")
                return Unauthorized(new { message = result });

            return Ok(new { token = result });
        }
    }
}
