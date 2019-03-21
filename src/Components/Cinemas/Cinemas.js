import React, { Component } from 'react';
import './Cinemas.scss';

import DeleteIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';


class Cinemas extends Component {
  render() {
    return (
      <div className="cinemas">

        <span className="cinemas__label"> Cinema Name</span>
        <div className="cinemas__square">
          <input type="text" className="cinemas__input" id="cinema-name" />
          <button className="cinemas__close"><DeleteIcon /></button>
        </div>


        <span className="cinemas__label"> City</span>
        <div className="cinemas__square">
          <input type="text" className="cinemas__input" id="cinema-city" />
          <button className="cinemas__close"><DeleteIcon /></button>
        </div>

        <div className="cinemas__add-hall">
          <span className="cinemas__label"> Add hall</span>
          <AddIcon className="cinemas__add-icon" />
        </div>
        <div className="cinemas-halls">  </div>
        <button className="cinemas__add-cinema"> Add</button>
      </div>
    );
  }
}

export default Cinemas;
