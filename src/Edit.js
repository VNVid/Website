import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class Edit extends Component {

    nullFoodItem = {
        description: '',
        calories: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            foodItem: this.nullFoodItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const newFoodItem = await (await fetch(`/food/${this.props.match.params.id}`)).json();
            this.setState({ foodItem: newFoodItem });
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let foodItem = { ...this.state.foodItem };
        foodItem[name] = value;
        console.log("save new " + name);
        console.log(foodItem);
        this.setState({ foodItem });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { foodItem, item } = this.state;

        console.log(this.state);
        console.log(foodItem);
        console.log(item);

        await fetch('/food' + (foodItem.id ? '/' + foodItem.id : ''), {
            method: (foodItem.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(foodItem),
        });
        this.props.history.push('/food');
    }

    render() {
        const { foodItem } = this.state;
        const title = <h2>{foodItem.id ? 'Edit your meal' : 'Add your meal'}</h2>;

        return <div>
            <AppNavbar />
            <Container fluid className={'set_background'}>
                {title}
                <Form onSubmit={this.handleSubmit} className='form'>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="text" name="description" id="description" value={foodItem.description || ''}
                            onChange={this.handleChange} autoComplete="description" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="calories">Calories</Label>
                        <Input type="text" name="calories" id="calories" value={foodItem.calories || ''}
                            onChange={this.handleChange} autoComplete="10" />
                    </FormGroup>
                    <FormGroup>
                        <Button
                            outline color="secondary"
                            style={{ color: "#00005c", margin: "1%", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)" }}
                            type="submit">Save</Button>{' '}
                        <Button
                            color="secondary"
                            style={{ color: "#00005c", margin: "1%", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)" }}
                            tag={Link} to="/food">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(Edit);