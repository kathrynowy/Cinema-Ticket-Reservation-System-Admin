import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import createBrowseHistory from "history/createBrowserHistory";

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
import SignIn from './Components/SignIn/SignIn';
import CustomSnackbar from './Components/Snackbar/Snackbar'
import { checkAuth } from './actions/auth'


export const history = createBrowseHistory();


class App extends Component {
  checkAuth = () => {
    return localStorage.getItem('token');
  }

  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    return (
      <div className="app">
        <Router > {
          this.props.isAdminLoggedIn
            ? (<div className="container">
              <NestedList />
              <Route path="/cinemas" component={Cinemas} />
              <Route exact path={["/cinema/add", "/cinema/:id/edit"]} component={AddCinema} />
              <Route path="/movies" component={Movies} />
              <Route path={["/movie/add", "/movie/:id/edit"]} component={AddMovie} />
              <Route path="/sessions" component={Sessions} />
              <Route path="/session/add" component={AddSession} />
              <Route exact path={[
                "/cinema/:cinemaId/hall/add",
                "/cinema/:cinemaId/hall/:hallId/edit",
                "/cinema/hall/:index/edit",
                "/cinema/hall/add"
              ]} component={AddHall} />
              <Route path="/error-page" component={ErrorPage} />
            </div>)
            : <Route component={SignIn} />
        }
          <CustomSnackbar isSnackbarOpen={this.props.isSnackbarOpen} message={this.props.message} />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  isAdminLoggedIn: store.auth.isAdminLoggedIn,
  isSnackbarOpen: store.snackbar.isSnackbarOpen,
  message: store.snackbar.message
})

const mapDispatchToProps = dispatch => ({
  checkAuth() {
    return dispatch(checkAuth());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
