import React, { Component } from 'react';

import AddIcon from '@material-ui/icons/Add';
import Input from '../Input/Input';
import './AddCinema.scss';


class AddCinema extends Component {
  render() {
    return (
      <div className="cinema">
        <Input label="Cinema" />
        <Input label="City" />
        <div className="cinema__add-hall">
          <span className="cinema__label"> Add hall</span>
          <AddIcon className="cinema__add-icon" />
        </div>
        <div className="halls"> </div>
        <button className="cinema__add-cinema">Add</button>
      </div>
    );
  }
}

export default AddCinema;
