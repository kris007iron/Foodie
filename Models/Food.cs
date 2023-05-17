namespace Foodie.Models
{
    public class Food
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int Kcal { get; set; }
        public float Protein { get; set; }
        public float Fat { get; set; }
        public float Carbs { get; set; }
    }
}
