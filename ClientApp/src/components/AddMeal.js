import React, { Component } from 'react';

export class AddMeal extends Component {
    static displayName = AddMeal.name;
    constructor(props) {
        super(props);
        this.state = { foods: [], loading: false, meal: [], searchVar: '' };          
    }
    componentDidMount() {
        this.getFoods();
    }

    handleClick(id) {
        let prevMeal = this.state.meal;
        this.setState({ meal: [...prevMeal, this.state.foods[id]] });
    }

    renderFoodsTable(foods) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Add to meal</th>
                    </tr>
                </thead>
                <tbody>
                    {foods.map(food => (
                        <tr key={food.name}>
                            <td>{food.name}</td>
                            <td>
                                <button onClick={() => this.handleClick(food.id)}>Add</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }



    renderMealTable(meal) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Kcal</th>
                    </tr>
                </thead>
                <tbody>
                    {meal.map(food => <tr key={food.name}>
                        <td>{food.name}</td>
                        <td>{food.kcal}</td>
                    </tr>
                    )}
                </tbody>
            </table>
        );
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
        this.setState({ foods: data, loading: false });
    }

    async getSpecFoods(value) {
        const response = await fetch('foods/spec?searchVal=' + encodeURIComponent(value));
        const data = await response.json();
        this.setState({ foods: data, loading: false });
    }

}