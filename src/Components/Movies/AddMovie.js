import React, { Component } from 'react';

import './AddMovie.scss';
import Input from '../Input/Input';


class AddMovie extends Component {
  render() {
    return (
      <div className="movie">
        <Input inputName="movie" />
        <span className="movie__label"> start date</span>
        <input
          type="date"
          name="start-date"
          id="start-date"
          className="movie__datepicker"
        />
        <span className="movie__label"> end date</span>
        <input
          type="date"
          name="start-date"
          id="start-date"
          className="movie__datepicker"
        >
        </input>
        <textarea className="movie__description"> </textarea>
        <button className="movie__add-movie"> add</button>
      </div >
    );
  }
}

export default AddMovie;
