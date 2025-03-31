using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Social.Demo.API.Models;

namespace Social.Demo.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Post> Posts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");
                entity.HasKey(u => u.Id);
                entity.Property(u => u.Id)
                    .HasColumnType("TEXT");
                entity.Property(u => u.Email)
                    .IsRequired()
                    .HasMaxLength(100);
                entity.HasIndex(u => u.Email)
                    .IsUnique();
                entity.Property(u => u.Password)
                    .IsRequired()
                    .HasMaxLength(100);
                entity.Property(u => u.Username)
                    .IsRequired()
                    .HasMaxLength(100);
                entity.HasMany(u => u.Posts)
                    .WithOne(p => p.User)
                    .HasForeignKey(p=>p.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            }
        );
        modelBuilder.Entity<Post>(entity =>
        {
            entity.ToTable("posts");
            entity.HasKey(p => p.Id);
            entity.Property(p => p.Id)
                .HasColumnType("TEXT");
            entity.Property(p => p.Content)
                .IsRequired()
                .HasMaxLength(200);
        });
    }
}