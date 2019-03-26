import React, { Component } from 'react';
import { Link } from "react-router-dom";

import AddIcon from '@material-ui/icons/Add';
import './Session.scss';


class Sessions extends Component {
  render() {
    return (
      <div className="session">
        <div className="session__add-session">
          <span className="session__label"> Add session</span>
          <Link to="/add-session" className="movies_link">
            <AddIcon className="session__add-icon" />
          </Link>
        </div>
        <div className="session-halls">  </div>
        <button className="session__add-sessions">Add</button>
      </div>
    );
  }
}

export default Sessions;
