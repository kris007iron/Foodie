import React, { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import '../custom.css';

export class AddMeal extends Component {
    static displayName = AddMeal.name;
    constructor(props) {
        super(props);
        this.state = { foods: [], foodsAll: [], loading: false, meal: [], searchVar: '', weights: {}, kcalGoal: 0};          
    }
    componentDidMount() {
        this.getFoods();
    }

    handleClick(food) {
        let prevMeal = this.state.meal;
        this.setState({ meal: [...prevMeal, food] });        
    }

    handleInputChange = (event) => {
        const newSearchVar = event.target.value;
        this.setState({ searchVar: newSearchVar });

        if (newSearchVar.trim() === '') {
            this.setState({ foods: [], loading: true });
        } else {
            this.getSpecFoods(newSearchVar);
        }
    };

    renderFoodsTable(foods) {
        if (foods.length > 10) {
            foods = foods.slice(0, 10);
        }
        const { searchVar } = this.state; // Add searchVar to component state

        // Check if search bar is empty, if yes, hide the list
        if (searchVar.trim() === '') {
            return null;
        }

        return (
            <ul className="list-group">
                {foods.map((food) => (
                    <li className="list-group-item" key={food.id}>
                        <button onClick={() => this.handleClick(food)}>{food.name}</button>
                    </li>
                ))}
            </ul>
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
        let bar = '';
        if (totalKcal > this.state.kcalGoal) {
            bar = (
                <ProgressBar>
                    <ProgressBar variant="success" now={this.state.kcalGoal / totalKcal * 100} key={1}/>
                    <ProgressBar striped variant="danger" now={(1.0 - this.state.kcalGoal / totalKcal) * 100} key={2} animated/>
                </ProgressBar>
            );
        } else {
            bar = (<ProgressBar variant="success" now={totalKcal / this.state.kcalGoal * 100} />);
        }
        return (
            <>     
                {bar}
            <p>Calories in different macros</p>
            <ProgressBar>
                <ProgressBar striped variant="success" now={totalProtein * 400 / totalKcal} key={1} />
                <ProgressBar variant="warning" now={totalFat * 900 / totalKcal} key={2} />
                <ProgressBar striped variant="danger" now={totalCarbs * 400 / totalKcal} key={3} />
            </ProgressBar>
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
            </table></>
        );
    }


    handleDelete(id) {
        const updatedMeal = this.state.meal.filter(food => food.id !== id);
        this.setState({ meal: updatedMeal });
    }


    render() {  
        const handleKcalChange = event => {
            const kcals = event.target.value;
            // Update the goal entry with the new kcal
            this.setState({ kcalGoal: kcals });
            this.forceUpdate(); // Re-render the component to update the kcal summary
        };        
        const { foods, loading } = this.state; // Destructure state variables
        let contents = loading ? (
            <p></p>
        ) : (
            this.renderFoodsTable(foods)
        );
        let meal = <p><em>Meal is empty</em></p>;
        if (this.state.meal.length >= 1) {
            meal = this.renderMealTable(this.state.meal);
        }

        return (
            <div>
                <input type="number" placeholder="0" value={this.state.kcalGoal} onChange={handleKcalChange} />
                {meal}
                <div>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Search..."
                        onChange={this.handleInputChange} // Update the event handler
                    />
                    {contents}
                </div>
                <p>This component demonstrates fetching data from the server.</p>
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