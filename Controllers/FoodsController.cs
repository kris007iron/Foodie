using Foodie.Data;
using Foodie.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Foodie.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FoodsController : ControllerBase
    {
        private readonly ILogger<FoodsController> _logger;

        private readonly ApiDbContext _context;

        public FoodsController(ILogger<FoodsController> logger, ApiDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet(Name = "GetAllFoods")]

        public async Task<IActionResult> Get()
        {
            await _context.SaveChangesAsync();

            var allFoods = await _context.Foods.ToListAsync();

            return Ok(allFoods);
        }
    }
}
