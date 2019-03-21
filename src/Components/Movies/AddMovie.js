import React, { Component } from 'react';
import './AddMovie.scss';

import DeleteIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';


class AddMovie extends Component {
  render() {
    return (
      <div className="movie">

        <span className="movie__label"> Movie title</span>
        <div className="movie__square">
          <input type="text" className="movie__input" id="movie-name" />
          <button className="movie__close"><DeleteIcon /></button>
        </div>


        <span className="movie__label"> Start date</span>
        <input type="date" name="start-date" id="start-date" className="movie__datepicker"></input>


        <span className="movie__label"> End date</span>
        <input type="date" name="start-date" id="start-date" className="movie__datepicker"></input>

        <textarea className="movie__description">  </textarea>
        <button className="movie__add-movie"> Add</button>
      </div >
    );
  }
}

export default AddMovie;
