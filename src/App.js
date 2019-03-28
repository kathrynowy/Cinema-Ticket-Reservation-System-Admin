import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.scss';
import NestedList from './Components/Panel/Panel.js';
import AddCinema from './Components/Cinemas/AddCinema';
import Cinemas from './Components/Cinemas/Cinemas';
import Movies from './Components/Movies/Movies';
import AddMovie from './Components/Movies/AddMovie';
import AddSession from './Components/Sessions/AddSession';
import Sessions from './Components/Sessions/Sessions';
import ErrorPage from './Components/ErrorPage/ErrorPage';


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
            <Route path="/movie-edit/:id" component={AddMovie} />
            <Route path="/sessions" component={Sessions} />
            <Route path="/add-session" component={AddSession} />
            <Route path="/error-page" component={ErrorPage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
