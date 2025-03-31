using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Social.Demo.API.Models;
using Social.Demo.API.Services;
using Social.Demo.API.DTOs;

namespace Social.Demo.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class PostsController: ControllerBase
{
    private readonly IPostRepository _postRepository;

    public PostsController(IPostRepository postRepository)
    {
        _postRepository = postRepository;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PostDetailsDto>>> GetPosts()
    {
        var posts = await _postRepository.GetPostsAsync();
        return Ok(posts);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<PostDetailsDto>> GetPost(Guid id)
    {
        var post = await _postRepository.GetPostByIdAsync(id);
        if (post == null)
        {
            return NotFound();
        }
        return Ok(post);
    }
    
    [HttpGet("user/{userId}")]
    public async Task<ActionResult<IEnumerable<PostDetailsDto>>> GetPostsByUserId(Guid userId)
    {
        var posts = await _postRepository.GetPostsByUserIdAsync(userId);
        return Ok(posts);
    }
    
    [HttpPost]
    public async Task<ActionResult<Post>> AddPost(CreatePostDto postDto)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest();
        }

        var newPost = await _postRepository.AddPostAsync(postDto);
        return CreatedAtAction(nameof(GetPost), new { id = newPost.Id }, newPost);
    }
    
    [HttpPut("{id}")]
    public async Task<ActionResult<Post>> UpdatePost(Guid id, UpdatePostDto postDto)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest();
        }
        
        var updated = await _postRepository.UpdatePostAsync(id, postDto);
        if (!updated)
        {
            return NotFound();
        }
        
        return NoContent();
    }
    
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeletePost(Guid id)
    {
        var deleted = await _postRepository.DeletePostAsync(id);
        if (!deleted)
        {
            return NotFound();
        }
        
        return NoContent();
    }
}