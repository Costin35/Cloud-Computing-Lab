namespace Social.Demo.API.Models;

public class User
{
    public Guid Id { get; set; } = new Guid();
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    
    public IEnumerable<Post> Posts { get; set; } = new List<Post>();
}