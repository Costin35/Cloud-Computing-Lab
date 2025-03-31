using Microsoft.EntityFrameworkCore;
using Social.Demo.API.Data;

namespace Social.Demo.API.Models;

public static class SeedData
{
    public static async Task InitializeAsync(ApplicationDbContext dbContext)
    {
        if (await dbContext.Users.AnyAsync())
        {
            return;
        }

        var users = new List<User>
        {
            new User
            {
                Id = Guid.NewGuid(),
                Username = "alice",
                Email = "alice@gmail.com",
                Password = "password"

            },
            new User
            {
                Id = Guid.NewGuid(),
                Username = "bob",
                Email = "bob@yahoo.com",
                Password = "password"
            },
            new User
            {
                Id = Guid.NewGuid(),
                Username = "charlie",
                Email = "charlie@uaic.ro",
                Password = "password"
            },
            new User
            {
                Id = Guid.NewGuid(),
                Username = "david",
                Email = "david@gmail.com",
                Password = "password"
            },
            new User
            {
                Id = Guid.NewGuid(),
                Username = "eve",
                Email = "evey@gmail.com",
                Password = "password"
            }
        };
        await dbContext.Users.AddRangeAsync(users);
        await dbContext.SaveChangesAsync();
        
        var posts = new List<Post>
        {
            new Post
            {
                Id = Guid.NewGuid(),
                UserId = users[0].Id,
                Content = "Hello, World!",
                CreatedAt = DateTime.Now
            },
            new Post
            {
                Id = Guid.NewGuid(),
                UserId = users[1].Id,
                Content = "Goodbye, World!",
                CreatedAt = DateTime.Now
            },
            new Post
            {
                Id = Guid.NewGuid(),
                UserId = users[2].Id,
                Content = "Hello, World!",
                CreatedAt = DateTime.Now
            },
            new Post
            {
                Id = Guid.NewGuid(),
                UserId = users[3].Id,
                Content = "Goodbye, World!",
                CreatedAt = DateTime.Now
            },
            new Post
            {
                Id = Guid.NewGuid(),
                UserId = users[4].Id,
                Content = "Hello, World!",
                CreatedAt = DateTime.Now
            },
            new Post
            {
                Id = Guid.NewGuid(),
                UserId = users[4].Id,
                Content = "Hallo Word!",
                CreatedAt = DateTime.Now
            }
        };
        await dbContext.Posts.AddRangeAsync(posts);
        await dbContext.SaveChangesAsync();
    }
}