import React, { Component } from 'react';
import './App.scss';
import NestedList from './Components/Panel/Panel.js'
import AddCinema from './Components/Cinemas/AddCinema';
import Cinemas from './Components/Cinemas/Cinemas';

class App extends Component {
  state = {
    isOpenCinemas: true,
    isOpenMovies: false,
    isOpenSessions: false,
  }

  openCinemas = () => {
    this.setState({
      isOpenCinemas: true
    })
  }

  openMovies = () => {

  }

  openSessions = () => {

  }

  render() {
    let cinemas, movies, sessions;
    if (this.state.isOpenCinemas) { cinemas = < Cinemas /> }
    return (
      <div className="App">
        <NestedList openCinemas={this.openCinemas} />
        <div className="container">
          {cinemas}
        </div>

      </div>
    );
  }
}

export default App;
