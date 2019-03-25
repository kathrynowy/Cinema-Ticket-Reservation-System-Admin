import React, { Component } from 'react';
import './App.scss';
import NestedList from './Components/Panel/Panel.js'
import AddCinema from './Components/Cinemas/AddCinema';
import Cinemas from './Components/Cinemas/Cinemas';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Movies from './Components/Movies/Movies';
import AddMovie from './Components/Movies/AddMovie';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router >
          <div className="container">
            <NestedList />
            <Route path="/cinemas" component={Cinemas} />
            <Route path="/add-cinema" component={AddCinema} />
            <Route path="/movies" component={Movies} />
            <Route path="/add-movie" component={AddMovie} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
