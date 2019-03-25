import React, { Component } from 'react';
import { Link } from "react-router-dom";

import DeleteIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import './Movies.scss';


class Movies extends Component {
  render() {
    return (
      <div className="movies">
        <div className="movies__add-movie">
          <span className="movies__label"> Add movie</span>
          <Link to="/add-movie" className="movies_link">
            <AddIcon className="movies__add-icon" />
          </Link>
        </div>

        <ul className="movies__list">
          <li className="movies__list-item">
            Alita
          </li>
          <li className="movies__list-item">
            Marvel
          </li>
          <li className="movies__list-item">
            Time
          </li>
          <li className="movies__list-item">
            Rapsody
          </li>
        </ul>
      </div>
    )
  }
}

export default Movies;