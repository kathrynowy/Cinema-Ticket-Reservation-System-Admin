import React, { Component } from 'react';
import './AddSession.scss';

import Input from '../Input/Input';
import MaterialUIPickers from '../Pickers/pickers'


class AddSession extends Component {
  render() {
    return (
      <form className="session">
        <span className="session__label"> City </span>
        <Input inputName="session-city" />

        <span className="session__label"> Cinema </span>
        <Input inputName="session-cinema" />

        <span className="session__label"> Hall</span>
        <Input inputName="session-hall" />

        <span className="session__label"> Movie</span>
        <Input inputName="session-movie" />

        <span className="session__label"> Ticket cost</span>
        <Input inputName="session-cost" />

        <span className="session__label"> Date & Time</span>
        <MaterialUIPickers />

        <button type="submit" className="session__add">Add</button>
      </form>
    );
  }
}

export default AddSession;
