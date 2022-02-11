import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import './style/Buttons.css';

class FoodList extends Component {

    constructor(props) {
        super(props);
        this.state = { food: [] };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/food')
            .then(response => response.json())
            .then(data => this.setState({ food: data }));
    }

    async remove(id) {
        await fetch('/food/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let withoutDeleted = [...this.state.food].filter(item => item.id !== id);
            this.setState({ food: withoutDeleted });
        });
    }

    async removeAll() {
        await fetch('/food/', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            this.setState({ food: [] });
        });
    }

    render() {
        const { food } = this.state;

        const foodList = food.map(foodItem => {
            return <tr key={foodItem.id}>
                <td style={{ whiteSpace: 'nowrap' }}>{foodItem.description}</td>
                <td>{foodItem.calories}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm"
                            outline color="secondary"
                            style={{ color: "#00005c", margin: "1%", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)" }}
                            tag={Link} to={"/food/" + foodItem.id}>Edit</Button>
                        <Button size="sm"
                            color="secondary"
                            style={{ color: "#00005c", margin: "1%", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)" }}
                            onClick={() => this.remove(foodItem.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        const calories = food.map(foodItem => foodItem.calories);
        const sum = calories.reduce((total, currentValue) =>
            total = total + currentValue, 0);

        return (
            <div>
                <AppNavbar />
                <Container fluid className={'set_background'}>
                    <div>
                        <h2>Your food list</h2>
                        <Button
                            outline color="secondary"
                            style={{ color: "#00005c", margin: "1%", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)" }}
                            tag={Link} to="/food/new">Add meal</Button>
                        <Button
                            color="secondary"
                            style={{ color: "#00005c", margin: "1%", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)" }}
                            onClick={() => this.removeAll()}>Clear all</Button>
                    </div>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="30%">Food</th>
                                <th width="30%">Calories</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodList}
                        </tbody>
                    </Table>
                    <h3>Overall calorific value: {sum}</h3>
                </Container>
            </div>
        );
    }
}
export default FoodList;





