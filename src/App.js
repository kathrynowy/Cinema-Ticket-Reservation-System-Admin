import React, { Component } from 'react';
import './App.scss';
import NestedList from './Components/Panel/Panel.js'
import AddCinema from './Components/Cinemas/AddCinema';
import Cinemas from './Components/Cinemas/Cinemas';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router >
          <div className="container">
            <NestedList />
            <Route path="/cinemas" component={Cinemas} />
            <Route path="/add-cinema" component={AddCinema} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
