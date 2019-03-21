import React, { Component } from 'react';
import './App.scss';
import NestedList from './Components/Panel/Panel.js'
import Cinemas from './Components/Cinemas/Cinemas';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NestedList />
        <div className="container">
          <Cinemas />
        </div>

      </div>
    );
  }
}

export default App;
