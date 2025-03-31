using Microsoft.AspNetCore.Mvc;
using Social.Demo.API.Services;
using Social.Demo.API.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace Social.Demo.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly JwtService _jwtService;

    public AuthController(IUserRepository userRepository, JwtService jwtService)
    {
        _userRepository = userRepository;
        _jwtService = jwtService;
    }

    [HttpGet("current")]
    [Authorize]
    public async Task<ActionResult<UserDetailsDto>> GetCurrentUser()
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (userId == null || !Guid.TryParse(userId, out var userGuid))
        {
            return Unauthorized();
        }

        var user = await _userRepository.GetUserByIdAsync(userGuid);
        if (user == null)
        {
            return Unauthorized();
        }

        return Ok(user);
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login(LoginDto loginDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest();
        }

        var user = await _jwtService.ValidateUserAsync(loginDto.Email, loginDto.Password);
        if (user == null)
        {
            return Unauthorized("Invalid email or password");
        }

        var token = await _jwtService.GenerateToken(user);
        var userDetails = await _userRepository.GetUserByIdAsync(user.Id);

        Response.Cookies.Append("jwt_token", token, new CookieOptions
        {
            HttpOnly = true,
            Secure = false,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddDays(7)
        });

        return new AuthResponseDto
        {
            Token = token,
            User = userDetails!
        };
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register(CreateUserDto createUserDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest();
        }

        try
        {
            var user = await _userRepository.AddUserAsync(createUserDto);
            var token = await _jwtService.GenerateToken(user);
            var userDetails = await _userRepository.GetUserByIdAsync(user.Id);

            Response.Cookies.Append("jwt_token", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)
            });

            return new AuthResponseDto
            {
                Token = token,
                User = userDetails!
            };
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("jwt_token");
        return Ok();
    }
} 