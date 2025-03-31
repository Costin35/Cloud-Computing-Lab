using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Social.Demo.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class JokeController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public JokeController(IHttpClientFactory httpClientFactory)
    {
        _httpClient = httpClientFactory.CreateClient();
    }

    [HttpGet("list")]
    public async Task<IActionResult> GetJokeList()
    {
        var url = "https://v2.jokeapi.dev/joke/Any?amount=20";

        try
        {
            var response = await _httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Error from JokeAPI.");
            }

            var content = await response.Content.ReadAsStringAsync();
            return Content(content, "application/json");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error fetching jokes: {ex.Message}");
        }
    }
}
