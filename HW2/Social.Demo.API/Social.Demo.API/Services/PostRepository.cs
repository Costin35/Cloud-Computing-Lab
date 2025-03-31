using Microsoft.EntityFrameworkCore;
using Social.Demo.API.Data;
using Social.Demo.API.Models;
using Social.Demo.API.DTOs;

namespace Social.Demo.API.Services;

public class PostRepository : IPostRepository
{
    private readonly ApplicationDbContext _dbContext;

    public PostRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task<IEnumerable<PostDetailsDto>> GetPostsAsync()
    {
        return await _dbContext.Posts
            .Include(p => p.User)
            .Select(p => new PostDetailsDto
            {
                Id = p.Id,
                Content = p.Content,
                CreatedAt = p.CreatedAt,
                Username = p.User!.Username,
                UserId = p.UserId
            })
            .ToListAsync();
    }
    
    public async Task<PostDetailsDto?> GetPostByIdAsync(Guid id)
    {
        var post = await _dbContext.Posts
            .Include(p => p.User)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (post == null)
        {
            return null;
        }

        return new PostDetailsDto
        {
            Id = post.Id,
            Content = post.Content,
            CreatedAt = post.CreatedAt,
            Username = post.User!.Username,
            UserId = post.UserId
        };
    }
    
    public async Task<IEnumerable<PostDetailsDto>> GetPostsByUserIdAsync(Guid userId)
    {
        return await _dbContext.Posts
            .Include(p => p.User)
            .Where(p => p.UserId == userId)
            .Select(p => new PostDetailsDto
            {
                Id = p.Id,
                Content = p.Content,
                CreatedAt = p.CreatedAt,
                Username = p.User!.Username,
                UserId = p.UserId
            })
            .ToListAsync();
    }
    
    public async Task<Post> AddPostAsync(CreatePostDto postDto)
    {
        var post = new Post
        {
            Id = Guid.NewGuid(),
            Content = postDto.Content,
            CreatedAt = postDto.CreatedAt,
            UserId = postDto.UserId
        };
        
        _dbContext.Posts.AddAsync(post);
        await _dbContext.SaveChangesAsync();
        return post;
    }
    
    public async Task<bool> UpdatePostAsync(Guid id, UpdatePostDto postDto)
    {
        var post = await _dbContext.Posts.FirstOrDefaultAsync(p => p.Id == id);
        if (post == null)
        {
            return false;
        }

        post.Content = postDto.Content;
        
        _dbContext.Posts.Update(post);
        return await _dbContext.SaveChangesAsync() > 0;
    }
    
    public async Task<bool> DeletePostAsync(Guid id)
    {
        var post = await _dbContext.Posts.FirstOrDefaultAsync(p => p.Id == id);
        if (post == null)
        {
            return false;
        }
        _dbContext.Posts.Remove(post);
        return await _dbContext.SaveChangesAsync() > 0;
    }
}