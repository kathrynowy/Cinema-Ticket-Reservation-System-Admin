import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getMoviesAsync } from '../../actions/index'
import AddIcon from '@material-ui/icons/Add';
import './Movies.scss';


class Movies extends Component {
  componentDidMount() {
    this.props.getMoviesAsync();
  }

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
          {
            this.props.movies.map((movie) => {
              return <li className="movies__list-item" key={movie.id}>{movie.name}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  movies: store.movies.movies
})

const mapDispatchToProps = dispatch => ({
  getMoviesAsync() {
    dispatch(getMoviesAsync());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Movies);