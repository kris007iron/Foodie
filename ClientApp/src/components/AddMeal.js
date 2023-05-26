import React, { Component } from 'react';

export class AddMeal extends Component {
    static displayName = AddMeal.name;
    constructor(props) {
        super(props);
        this.state = { foods: [], foodsAll: [], loading: false, meal: [], searchVar: '', weights: {} };          
    }
    componentDidMount() {
        this.getFoods();
    }

    handleClick(food) {
        let prevMeal = this.state.meal;
        this.setState({ meal: [...prevMeal, food] });        
    }

    renderFoodsTable(foods) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Add to meal</th>
                    </tr>
                </thead>
                <tbody>
                    {foods.map(food => (
                        <tr key={food.name}>
                            <td>{food.name}</td>
                            <td>{food.id}</td>
                            <td>
                                <button onClick={() => this.handleClick(food)}>Add</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    renderMealTable(meal) {
        let totalKcal = 0;
        let totalProtein = 0;
        let totalFat = 0;
        let totalCarbs = 0;

        const handleDelete = (food) => {
            food.grams = 0;
            const updatedMeal = this.state.meal.filter(item => item !== food);
            this.setState({ meal: updatedMeal });
        };

        const mealRows = meal.map(food => {
            const handleChange = event => {
                const grams = event.target.value;
                // Update the meal entry with the new weight in grams
                food.grams = grams;
                this.forceUpdate(); // Re-render the component to update the kcal summary
            };

            const handleDeleteClick = () => {
                handleDelete(food);
            };

            const kcal = food.kcal * food.grams / 100; // Calculate the kcal based on the weight in grams
            const protein = food.protein * food.grams / 100;
            const fat = food.fat * food.grams / 100;
            const carbs = food.carbs * food.grams / 100;
            totalKcal += kcal; // Update the total kcal
            totalProtein += protein;
            totalFat += fat;
            totalCarbs += carbs;

            return (
                <tr key={food.id}>
                    <td>{food.name}</td>                    
                    <td>
                        <input type="number" placeholder="0" value={food.grams} onChange={handleChange} />
                    </td>
                    <td>{kcal}</td>
                    <td>{protein}</td>
                    <td>{fat}</td>
                    <td>{carbs}</td>
                    <td>
                        <button onClick={handleDeleteClick}>Delete</button>
                    </td>
                </tr>
            );
        });

        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Name</th>                        
                        <th>Weight(g)</th>
                        <th>Kcal</th>
                        <th>Protein</th>
                        <th>Fat</th>
                        <th>Carbs</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {mealRows}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2">Total</td>
                        <td>{totalKcal}</td>
                        <td>{totalProtein}</td>
                        <td>{totalFat}</td>
                        <td>{totalCarbs}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        );
    }


    handleDelete(id) {
        const updatedMeal = this.state.meal.filter(food => food.id !== id);
        this.setState({ meal: updatedMeal });
    }
    
    render() {
        
        let contents = this.state.loading ? (
            <p>
                <em>Loading...</em>
            </p>
        ) : (
            this.renderFoodsTable(this.state.foods)
        );
        let meal = <p><em>Meal is empty</em></p>;
        if (this.state.meal.length >= 1) {
            meal = this.renderMealTable(this.state.meal);
        }

        return (
            <div>       
                {meal}
                <div>
                    <input type="text" placeholder="Search..." onChange={event => { if (event.target.value === "") { this.getFoods() } else { this.getSpecFoods(event.target.value);}}} />
                </div>
                <h1 id="tableLabel">Foods</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async getFoods() {
        const response = await fetch('foods/all');
        const data = await response.json();
        this.setState({ foods: data, foodsAll: data, loading: false });
    }

    async getSpecFoods(value) {
        const response = await fetch('foods/spec?searchVal=' + encodeURIComponent(value));
        const data = await response.json();
        this.setState({ foods: data, loading: false });
    }

}