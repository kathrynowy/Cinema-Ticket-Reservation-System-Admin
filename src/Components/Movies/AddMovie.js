import React, { Component } from 'react';

import './AddMovie.scss';
import Input from '../Input/Input';


class AddMovie extends Component {
  render() {
    return (
      <div className="movie">
        <span className="movie__label"> Movie title</span>
        <Input inputName="movie" />
        <span className="movie__label"> Start date</span>
        <input
          type="date"
          name="start-date"
          id="start-date"
          className="movie__datepicker"
        />
        <span className="movie__label"> End date</span>
        <input
          type="date"
          name="start-date"
          id="start-date"
          className="movie__datepicker"
        >
        </input>
        <textarea className="movie__description"> </textarea>
        <button className="movie__add-movie"> Add</button>
      </div >
    );
  }
}

export default AddMovie;
