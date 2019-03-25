import React, { Component } from 'react';
import './AddSession.scss';

import Input from '../Input/Input';
import CustomDatePicker from '../Pickers/DatePicker'


class AddSession extends Component {
  render() {
    return (
      <form className="session">
        <Input label="city" />
        <Input label="cinema" />
        <Input label="hall" />
        <Input label="movie" />
        <Input label="cost" />
        <span className="session__label"> date & time</span>
        <CustomDatePicker type="date-time" />
        <button type="submit" className="session__add">Add</button>
      </form>
    );
  }
}

export default AddSession;
