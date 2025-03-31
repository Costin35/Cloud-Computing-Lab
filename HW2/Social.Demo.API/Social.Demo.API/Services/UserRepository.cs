using Microsoft.EntityFrameworkCore;
using Social.Demo.API.Data;
using Social.Demo.API.Models;
using Social.Demo.API.DTOs;

namespace Social.Demo.API.Services;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _dbContext;

    public UserRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task<IEnumerable<UserDetailsDto>> GetUsersAsync()
    {
        return await _dbContext.Users
            .Include(u => u.Posts)
            .Select(u => new UserDetailsDto
            {
                Id = u.Id,
                Username = u.Username,
                Email = u.Email,
                Posts = u.Posts.Select(p => new PostDetailsDto
                {
                    Id = p.Id,
                    Content = p.Content,
                    CreatedAt = p.CreatedAt,
                    Username = u.Username
                })
            })
            .ToListAsync();
    }
    
    public async Task<UserDetailsDto?> GetUserByIdAsync(Guid id)
    {
        var user = await _dbContext.Users
            .Include(u => u.Posts)
            .FirstOrDefaultAsync(u => u.Id == id);

        if (user == null)
        {
            return null;
        }

        return new UserDetailsDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            Posts = user.Posts.Select(p => new PostDetailsDto
            {
                Id = p.Id,
                Content = p.Content,
                CreatedAt = p.CreatedAt,
                Username = user.Username
            })
        };
    }
    
    public async Task<UserDetailsDto?> GetUserByUsernameAsync(string username)
    {
        var user = await _dbContext.Users
            .Include(u => u.Posts)
            .FirstOrDefaultAsync(u => u.Username == username);

        if (user == null)
        {
            return null;
        }

        return new UserDetailsDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            Posts = user.Posts.Select(p => new PostDetailsDto
            {
                Id = p.Id,
                Content = p.Content,
                CreatedAt = p.CreatedAt,
                Username = user.Username
            })
        };
    }

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        return await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
    }
    
    public async Task<User> AddUserAsync(CreateUserDto userDto)
    {
        // Check if email already exists
        if (await _dbContext.Users.AnyAsync(u => u.Email == userDto.Email))
        {
            throw new InvalidOperationException("Email already exists");
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            Username = userDto.Username,
            Email = userDto.Email,
            Password = userDto.Password
        };
        
        _dbContext.Users.AddAsync(user);
        await _dbContext.SaveChangesAsync();
        return user;
    }
    
    public async Task<bool> UpdateUserAsync(Guid id, UpdateUserDto userDto)
    {
        var user = await _dbContext.Users.FindAsync(id);
        if (user == null)
        {
            return false;
        }

        if (await _dbContext.Users.AnyAsync(u => u.Email == userDto.Email && u.Id != id))
        {
            throw new InvalidOperationException("Email already exists");
        }

        user.Username = userDto.Username;
        user.Email = userDto.Email;
        
        _dbContext.Users.Update(user);
        return await _dbContext.SaveChangesAsync() > 0;
    }
    
    public async Task<bool> DeleteUserAsync(Guid id)
    {
        var user = await _dbContext.Users.FindAsync(id);
        if (user == null)
        {
            return false;
        }
        
        _dbContext.Users.Remove(user);
        return await _dbContext.SaveChangesAsync() > 0;
    }
}