import React, { Component } from 'react';
import './AddSession.scss';

import DeleteIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';


class AddSession extends Component {
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
            <p>text text text</p>
            <a href="#modal-close">Close</a>
          </div>
        </div>
      </div>
    );
  }
}

export default AddSession;
