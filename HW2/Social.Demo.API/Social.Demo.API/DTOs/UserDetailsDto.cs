using Social.Demo.API.DTOs;

namespace Social.Demo.API.DTOs;

public class UserDetailsDto
{
    public Guid Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public IEnumerable<PostDetailsDto> Posts { get; set; } = new List<PostDetailsDto>();
} 