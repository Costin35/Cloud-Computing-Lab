namespace Social.Demo.API.DTOs;

public class AuthResponseDto
{
    public string Token { get; set; } = string.Empty;
    public UserDetailsDto User { get; set; } = null!;
} 