using Foodie.Models;
using Microsoft.EntityFrameworkCore;

namespace Foodie.Data
{
    public class ApiDbContext : DbContext
    {
        public ApiDbContext() { }
        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options) { }
        public DbSet<Food> foods { get; set; }
    }
}
