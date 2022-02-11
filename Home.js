import React, { Component } from 'react';
import './style/App.css';
import './style/Buttons.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Label } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar />
                <Container fluid className={'app'}>
                    <label className='intro_text'>This website will help you keep track of your calorie intake</label>
                </Container>
                <Container fluid className={'app'}>
                    <button className={'start_button'}><Link to="/food">Calories counter</Link></button>
                </Container>
            </div>
        );
    }
}

export default Home;