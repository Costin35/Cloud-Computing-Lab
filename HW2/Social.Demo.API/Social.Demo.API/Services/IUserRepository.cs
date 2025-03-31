using Social.Demo.API.Models;
using Social.Demo.API.DTOs;

namespace Social.Demo.API.Services;

public interface IUserRepository
{
    Task<IEnumerable<UserDetailsDto>> GetUsersAsync();
    Task<UserDetailsDto?> GetUserByIdAsync(Guid id);
    Task<UserDetailsDto?> GetUserByUsernameAsync(string username);
    Task<User?> GetUserByEmailAsync(string email);
    Task<User> AddUserAsync(CreateUserDto userDto);
    Task<bool> UpdateUserAsync(Guid id, UpdateUserDto userDto);
    Task<bool> DeleteUserAsync(Guid id);
}