import React, { Component } from 'react';
import './AddSession.scss';

import DeleteIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import TimeInput from 'material-ui-time-picker'



class AddSession extends Component {
  y


  render() {
    return (
      <div className="session">

        <div className="session__add-session">
          <span className="session__label"> Add session</span>
          <a href="#open-modal" className="session__add-button">
            <AddIcon className="session__add-icon" />
          </a>
        </div>
        <div className="session-halls">  </div>
        <button className="session__add-sessions">Add</button>

        <div className="modal" id="open-modal">
          <div className="modal-container">
            <span className="session__cinema-label"> Cinema </span>
            <div className="session__square">
              <input type="text" className="cinema__input" id="cinema-name" />
              <button className="cinema__close" type="reset"><DeleteIcon /></button>
            </div>


            <span className="session__hall-label"> Hall</span>
            <div className="session__square">
              <input type="text" className="cinema__input" id="cinema-city" />
              <button className="cinema__close"><DeleteIcon /></button>
            </div>

            <span className="session__hall-label"> Movie</span>
            <div className="session__square">
              <input type="text" className="cinema__input" id="cinema-city" />
              <button className="cinema__close"><DeleteIcon /></button>
            </div>



            <span className="session__hall-label"> Ticket cost</span>
            <div className="session__square">
              <input type="text" className="cinema__input" id="cinema-city" />
              <button className="cinema__close"><DeleteIcon /></button>
            </div>

            <span className="session__hall-label"> Date & Time</span>
            <div className="session__time-picker">
              <TimeInput
                mode='24h'
              /* onChange={(time) => this.handleChange(time)} */
              />
            </div>


            <a href="#" className="modal__add-session">Close</a>
          </div>
        </div>
      </div>
    );
  }
}

export default AddSession;
