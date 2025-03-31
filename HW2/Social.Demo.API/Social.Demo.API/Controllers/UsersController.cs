using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Social.Demo.API.Models;
using Social.Demo.API.Services;
using Social.Demo.API.DTOs;

namespace Social.Demo.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public UsersController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [Authorize]
    [HttpGet]
    public async Task<IEnumerable<UserDetailsDto>> GetUsers()
    {
        return await _userRepository.GetUsersAsync();
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<UserDetailsDto>> GetUserById(Guid id)
    {
        var user = await _userRepository.GetUserByIdAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }
    
    [Authorize]
    [HttpGet("username/{username}")]
    public async Task<ActionResult<UserDetailsDto>> GetUserByUsername(string username)
    {
        var user = await _userRepository.GetUserByUsernameAsync(username);
        if (user == null)
        {
            return NotFound();
        }

        return user;
    }
    
    [HttpPost]
    public async Task<ActionResult<User>> AddUser(CreateUserDto userDto)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest();
        }

        var newUser = await _userRepository.AddUserAsync(userDto);
        return CreatedAtAction(nameof(GetUserById), new { id = newUser.Id }, newUser);
    }
    
    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(Guid id, UpdateUserDto userDto)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest();
        }

        if (!await _userRepository.UpdateUserAsync(id, userDto))
        {
            return NotFound();
        }

        return NoContent();
    }
    
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(Guid id)
    {
        if (!await _userRepository.DeleteUserAsync(id))
        {
            return NotFound();
        }

        return NoContent();
    }
}