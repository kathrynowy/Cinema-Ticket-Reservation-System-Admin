import React, { Component } from 'react';
import './AddSession.scss';

import Input from '../Input/Input';
import MaterialUIPickers from '../Pickers/pickers'


class AddSession extends Component {
  render() {
    return (
      <form className="session">
        <Input inputName="city" />
        <Input inputName="cinema" />
        <Input inputName="hall" />
        <Input inputName="movie" />
        <Input inputName="cost" />
        <span className="session__label"> date & time</span>
        <MaterialUIPickers />
        <button type="submit" className="session__add">Add</button>
      </form>
    );
  }
}

export default AddSession;
