using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Social.Demo.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class NewsController : ControllerBase
{
    private const string ApiKey = "af55675776ae42a58b39b976f8aba602";

    [HttpGet("top-headlines")]
    public async Task<IActionResult> GetTopHeadlines()
    {
        var handler = new HttpClientHandler
        {
            ServerCertificateCustomValidationCallback = 
                (message, cert, chain, errors) => true
        };

        var client = new HttpClient(handler);

        try
        {
            var url = $"https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey={ApiKey}";

            var response = await client.GetAsync(url);
            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, $"Error at the external API: {response}");
            }

            var content = await response.Content.ReadAsStringAsync();
            return Content(content, "application/json");
        }
        catch (HttpRequestException ex)
        {
            return StatusCode(500, $"Error connecting to API News: {ex.Message}");
        }
    }
}