import React, { Component } from 'react';
import './AddSession.scss';

import Input from '../Input/Input';
import CustomDatePicker from '../Pickers/DatePicker'


class AddSession extends Component {
  render() {
    return (
      <form className="session">
        <Input label="City" />
        <Input label="Cinema" />
        <Input label="Hall" />
        <Input label="Movie" />
        <Input label="Cost" />
        <CustomDatePicker type="date-time" label="Date & Time" />
        <button type="submit" className="session__add">Add</button>
      </form>
    );
  }
}

export default AddSession;
