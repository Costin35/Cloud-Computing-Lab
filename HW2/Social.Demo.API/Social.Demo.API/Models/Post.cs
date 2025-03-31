namespace Social.Demo.API.Models;

public class Post
{
    public Guid Id { get; set; } = new Guid();
    public string Content { get; set; } = string.Empty;
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    
    public Guid UserId { get; set; }
    public User? User { get; set; }
}