import React, { Component } from 'react';

export class AddMeal extends Component {
    static displayName = AddMeal.name;
    constructor(props) {
        super(props);
        this.state = { foods: [], loading: true, meal: [], searchVar: ""};
    }
    componentDidMount() {
        //this.getFoods();
    }

    static renderFoodsTable(foods) {        
        return (
            <><table className="table table-striped" aria-labelledby="tableLabel">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Add to meal</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {foods.map(food => <tr key={food.name}>
                            <td>{food.name}</td>
                            <td><button onClick={() => this.AddFood(food.id)}>Add</button></td>
                        </tr>
                        )}
                    </tbody>
                </table></>
        );
    }

    static renderMealTable(meal) {
        return (
            <><table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Weight(g)</th>
                    </tr>
                </thead>
                <tbody>
                    {meal.map(food => <tr key={food.name}>
                        <td>{food.name}</td>
                        <td><input type="number" id="quantity" name="quantity" min="1" max="3000"/></td>
                    </tr>
                    )}
                </tbody>
            </table></>
        );
    }

    render() {
        
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : AddMeal.renderFoodsTable(this.state.foods);
        let meal = <p><em>Meal is empty</em></p>
        if (this.state.meal.length >= 1) {
            meal = this.renderMealTable(this.meal)
        }
        console.log(this)

        return (
            <div>
                {meal}
                <div>
                    <input type="text" placeholder="Search..." onChange={event => { if (event.target.value === "") { this.getFoods() } else { this.getSpecFoods(event.target.value); this.render(); }}} />
                </div>
                <h1 id="tableLabel">Foods</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async AddFood(id) {        
        const response = await fetch('foods/getOne?id=' + id);
        const data = await response.json();
        this.setState({            
            meal: this.state.meal.push(data)});
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