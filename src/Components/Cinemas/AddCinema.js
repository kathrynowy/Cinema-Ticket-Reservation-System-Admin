import React, { Component } from 'react';
import './AddCinema.scss';

import DeleteIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

class AddCinema extends Component {
  render() {
    return (
      <form>
        <div className="cinema">

          <span className="cinema__label"> Cinema Name</span>
          <div className="cinema__square">
            <input type="text" className="cinema__input" id="cinema-name" />
            <button className="cinema__close" type="reset"><DeleteIcon /></button>
          </div>


          <span className="cinema__label"> City</span>
          <div className="cinema__square">
            <input type="text" className="cinema__input" id="cinema-city" />
            <button className="cinema__close"><DeleteIcon /></button>
          </div>

          <div className="cinema__add-hall">
            <span className="cinema__label"> Add hall</span>
            <AddIcon className="cinema__add-icon" />
          </div>
          <div className="cinema-halls">  </div>
          <button className="cinema__add-cinema">Add</button>


        </div>
      </form>
    );
  }
}

export default AddCinema;
