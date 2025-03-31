namespace Social.Demo.API.DTOs;

public class PostDetailsDto
{
    public Guid Id { get; set; }
    public string Content { get; set; } = string.Empty;
    public DateTimeOffset CreatedAt { get; set; }
    public string Username { get; set; } = string.Empty;
    
    public Guid UserId { get; set; }
} 