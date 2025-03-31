using Microsoft.AspNetCore.Mvc;

namespace Social.Demo.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class QuotesController : ControllerBase
{
    private readonly HttpClient _http;

    public QuotesController(IHttpClientFactory httpClientFactory)
    {
        _http = httpClientFactory.CreateClient();
    }

    [HttpGet("quote")]
    public async Task<IActionResult> GetQuote()
    {
        var handler = new HttpClientHandler
        {
            ServerCertificateCustomValidationCallback = 
                (message, cert, chain, errors) => true
        };

        var client = new HttpClient(handler);

        try
        {
            var response = await client.GetAsync("https://api.quotable.io/quotes?limit=20");
            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Error at the external API.");
            }

            var content = await response.Content.ReadAsStringAsync();
            return Content(content, "application/json");
        }
        catch (HttpRequestException ex)
        {
            return StatusCode(500, $"Error at connecting to the external API: {ex.Message}");
        }
    }
}
    