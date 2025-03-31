using Social.Demo.API.Models;
using Social.Demo.API.DTOs;

namespace Social.Demo.API.Services;

public interface IPostRepository
{
    public Task<IEnumerable<PostDetailsDto>> GetPostsAsync();
    public Task<PostDetailsDto?> GetPostByIdAsync(Guid id);
    public Task<IEnumerable<PostDetailsDto>> GetPostsByUserIdAsync(Guid userId);
    public Task<Post> AddPostAsync(CreatePostDto postDto);
    public Task<bool> UpdatePostAsync(Guid id, UpdatePostDto postDto);
    public Task<bool> DeletePostAsync(Guid id);
}