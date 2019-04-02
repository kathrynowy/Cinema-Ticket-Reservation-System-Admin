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
import AddHall from './Components/Hall/AddHall';
import ErrorPage from './Components/ErrorPage/ErrorPage';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router >
          <div className="container">
            <NestedList />
            <Route path="/cinemas" component={Cinemas} />
            <Route path={["/cinema/add", "/cinema/edit/:id"]} component={AddCinema} />
            <Route path="/movies" component={Movies} />
            <Route path={["/movie/add", "/movie/edit/:id"]} component={AddMovie} />
            <Route path="/sessions" component={Sessions} />
            <Route path="/session/add" component={AddSession} />
            <Route path={[
              "/cinema/:cinemaId/hall/add",
              "/cinema/:cinemaId/hall/edit/:hallId",
              "/cinema/hall/edit/:index",
              "/cinema/hall/add"
            ]} component={AddHall} />
            <Route path="/error-page" component={ErrorPage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
