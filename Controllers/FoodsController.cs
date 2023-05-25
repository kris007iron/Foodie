using Foodie.Data;
using Foodie.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

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

        [HttpGet(Name = "GetSpecFoods"), Route("spec")]

        public async Task<List<Food>> GetClose(string searchVal)
        {
            //await _context.SaveChangesAsync();
            var allFoods = await _context.foods.ToListAsync();
            //return Ok(allFoods);            
            return GetClosestFoods(allFoods, searchVal, 0.01);
        }
        
        [HttpGet(Name = "GetAllFoods"), Route("all")]
        public async Task<List<Food>> GetAll()
        {
            //await _context.SaveChangesAsync();
            //var allFoods = await _context.foods.ToListAsync();
            //return Ok(allFoods);
            using (var context = _context)
            {
                return await context.foods.ToListAsync();
            }
        }
         
        public static List<Food> GetClosestFoods(List<Food> foods, string searchValue, double topPercentage)
        {
            List<FoodDistance> distances = new List<FoodDistance>();

            foreach (Food food in foods)
            {
                int distance = ComputeLevenshteinDistance(food.name, searchValue);
                double similarity = 1 - (double)distance / Math.Max(food.name.Length, searchValue.Length);

                distances.Add(new FoodDistance(food, similarity));
            }

            // Sort the distances in descending order of similarity
            distances.Sort((x, y) => y.Similarity.CompareTo(x.Similarity));

            int topCount = (int)Math.Ceiling(foods.Count * topPercentage);
            return distances.Take(topCount).Select(f => f.Food).ToList();
        }

        public static int ComputeLevenshteinDistance(string s, string t)
        {
            int m = s.Length;
            int n = t.Length;

            int[,] d = new int[m + 1, n + 1];

            for (int i = 0; i <= m; i++)
                d[i, 0] = i;

            for (int j = 0; j <= n; j++)
                d[0, j] = j;

            for (int j = 1; j <= n; j++)
            {
                for (int i = 1; i <= m; i++)
                {
                    int cost = (s[i - 1] == t[j - 1]) ? 0 : 1;

                    d[i, j] = Math.Min(Math.Min(
                        d[i - 1, j] + 1,
                        d[i, j - 1] + 1),
                        d[i - 1, j - 1] + cost);
                }
            }

            return d[m, n];
        }
    }

    public class FoodDistance
    {
        public Food Food { get; set; }
        public double Similarity { get; set; }

        public FoodDistance(Food food, double similarity)
        {
            Food = food;
            Similarity = similarity;
        }
    }
}

