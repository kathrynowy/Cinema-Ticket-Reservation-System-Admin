import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getMoviesAsync, deleteMovieAsync } from '../../actions/index'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import MovieIcon from '@material-ui/icons/Movie';
import './Movies.scss';


class Movies extends Component {
  componentDidMount() {
    this.props.getMoviesAsync();
  }

  deleteMovie = (id) => {
    this.props.deleteMovie(id);
  }

  render() {
    return (
      <div className="movies">
        {
          this.props.errors
            ? this.props.history.push('/error-page')
            : this.props.movies && <Fragment>
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
                      <div className="movies__list-item movie">
                        <MovieIcon className="movie__icon" />
                        <Link to={{ pathname: `/movie-edit/${movie.id}` }} className="movie__item-link">
                          <li className="movie__name" key={movie.id}>
                            {movie.name}
                          </li>
                        </Link>
                        <DeleteIcon className="movie__icon movie__icon_delete" onClick={() => this.deleteMovie(movie.id)} />
                      </div>
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
  },
  deleteMovie(id) {
    dispatch(deleteMovieAsync(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Movies);