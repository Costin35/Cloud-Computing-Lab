namespace Social.Demo.API.DTOs;

public class CreatePostDto
{
    public Guid UserId { get; set; }
    public string Content { get; set; } = string.Empty;
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
} 