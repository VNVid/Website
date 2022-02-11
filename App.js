import React, { Component } from 'react';
import './style/App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FoodList from './FoodList';
import Edit from "./Edit";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home} />
          <Route path='/food' exact={true} component={FoodList} />
          <Route path='/food/:id' component={Edit} />
        </Switch>
      </Router>
    )
  }
}

export default App;