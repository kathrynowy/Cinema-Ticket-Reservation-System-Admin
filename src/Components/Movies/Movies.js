import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getMoviesAsync } from '../../actions/index'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import MovieIcon from '@material-ui/icons/Movie';
import './Movies.scss';


class Movies extends Component {
  componentDidMount() {
    this.props.getMoviesAsync();
  }

  render() {
    return (
      <div className="movies">
        {
          this.props.errors
            ? this.props.history.push('/error-page')
            : <Fragment>
              <div className="movies__add-movie">
                <span className="movies__label"> Add movie</span>
                <Link to="/add-movie" className="movies_link">
                  <AddIcon className="movies__add-icon" />
                </Link>
              </div>

              <ul className="movies__list">
                {
                  this.props.movies.map((movie) => {
                    return (
                      <Link to={{ pathname: `/movie-edit/${movie.id}` }} className="movies__list-link">
                        <li className="movies__list-item movie" key={movie.id}>
                          <MovieIcon className="movie__icon" />
                          <span className="movie__name">
                            {movie.name}
                          </span>
                          <DeleteIcon className="movie__icon movie__icon_delete" />
                        </li>
                      </Link>
                    )
                  })
                }
              </ul>
            </Fragment>
        }
      </div>
    )
  }
}

const mapStateToProps = store => ({
  movies: store.movies.movies,
  errors: store.movies.errors
})

const mapDispatchToProps = dispatch => ({
  getMoviesAsync() {
    dispatch(getMoviesAsync());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Movies);