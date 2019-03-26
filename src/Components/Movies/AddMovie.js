import React, { Component } from 'react';

import './AddMovie.scss';
import Input from '../Input/Input';
import CustomDatePicker from '../Pickers/DatePicker'


class AddMovie extends Component {
  render() {
    return (
      <div className="movie">
        <Input label="Movie" />
        <CustomDatePicker type="date" label="Start date" />
        <CustomDatePicker type="date" label="End date" />
        <textarea className="movie__description"> </textarea>
        <button className="movie__add-movie"> Add</button>
      </div >
    );
  }
}

export default AddMovie;
