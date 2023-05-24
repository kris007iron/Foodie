namespace Foodie.Models
{
    public class Food
    {
        public int id { get; set; }
        public string? name { get; set; }
        public int kcal { get; set; }
        public float protein { get; set; }
        public float fat { get; set; }
        public float carbs { get; set; }
    }
}
