import React, { Component } from 'react';

import './AddMovie.scss';
import Input from '../Input/Input';
import CustomDatePicker from '../Pickers/DatePicker'


class AddMovie extends Component {
  render() {
    return (
      <div className="movie">
        <Input label="movie" />
        <label className="movie__label"> start date
          <CustomDatePicker type="date" />
        </label>
        <label className="movie__label"> end date
          <CustomDatePicker type="date" />
        </label>
        <textarea className="movie__description"> </textarea>
        <button className="movie__add-movie"> add</button>
      </div >
    );
  }
}

export default AddMovie;
