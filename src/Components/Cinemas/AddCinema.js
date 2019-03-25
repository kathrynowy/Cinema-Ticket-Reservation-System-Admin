import React, { Component } from 'react';

import AddIcon from '@material-ui/icons/Add';
import Input from '../Input/Input';
import './AddCinema.scss';


class AddCinema extends Component {
  render() {
    return (
      <form>
        <div className="cinema">
          <span className="cinema__label"> Cinema Name</span>
          <Input inputName="cinema-cinema" />

          <span className="cinema__label"> City</span>
          <Input inputName="cinema-city" />

          <div className="cinema__add-hall">
            <span className="cinema__label"> Add hall</span>
            <AddIcon className="cinema__add-icon" />
          </div>

          <div className="cinema-halls"> </div>
          <button className="cinema__add-cinema">Add</button>
        </div>
      </form>
    );
  }
}

export default AddCinema;
