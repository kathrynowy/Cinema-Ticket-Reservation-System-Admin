import React, { Component } from 'react';

import AddIcon from '@material-ui/icons/Add';
import Input from '../Input/Input';
import { Link } from "react-router-dom";
import './AddCinema.scss';


class AddCinema extends Component {
  render() {
    return (
      <div className="cinema">
        <Input label="Cinema" />
        <Input label="City" />
        <Link to="/add-hall" className="cinema__link link">
          <span className="link__label"> Add hall</span>
          <AddIcon className="link__add-icon" />
        </Link>
        <div className="halls"> </div>
        <button className="cinema__add-cinema">Add</button>
      </div>
    );
  }
}

export default AddCinema;
