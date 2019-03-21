import React, { Component } from 'react';

import DeleteIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import './Cinemas.scss';


class Cinemas extends Component {
  render() {
    return (
      <div className="cinemas">
        <div className="cinemas__add-cinema">
          <span className="cinemas__label"> Add cinema</span>
          <AddIcon className="cinemas__add-icon" />
        </div>

        <ul className="cinemas__list">
          <li className="cinemas__list-item">
            October
          </li>
          <li className="cinemas__list-item">
            Avrora
          </li>
          <li className="cinemas__list-item">
            Belarus
          </li>
          <li className="cinemas__list-item">
            Silver Screen
          </li>
        </ul>
      </div>
    )
  }
}

export default Cinemas;