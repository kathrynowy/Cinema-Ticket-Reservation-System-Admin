import React, { Component } from 'react';
import { connect } from 'react-redux';

import './AddMovie.scss';
import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea'
import {
  addMovieAsync,
  getMovieAsync,
  clearMovie,
  editMovieAsync
} from '../../actions/movie'


class AddMovie extends Component {
  state = {
    description: this.props.movie.description || '',
    name: this.props.movie.name || '',
    url: this.props.movie.img || ''
  }

  componentDidMount() {
    const movieId = this.props.match.params.id;
    if (movieId) {
      this.props.clearMovie();
      this.props.getMovie(movieId);
    }
  }

  componentWillUnmount() {
    this.props.clearMovie();
  }

  addMovie = () => {
    const movie = {
      name: this.state.name,
      img: this.state.url,
      description: this.state.description
    }
    this.props.onAddMovie(movie);
  }

  editMovie = () => {
    const movie = {
      name: this.state.name,
      img: this.state.url,
      description: this.state.description
    }
    this.props.editMovie(movie, this.props.match.params.id)
  }

  changeMovie = (name) => {
    this.setState({ name });
  }

  changeUrl = (url) => {
    this.setState({ url });
  }

  changeDescription = (description) => {
    this.setState({ description });
  }

  render() {
    return (
      <div className="movie">
        <Input
          label="Movie"
          handleChanges={this.changeMovie}
          value={this.props.movie.name}
        />
        <Textarea
          label="Descripton"
          initialValue={this.props.movie.description}
          onChange={this.changeDescription}
        />
        <Input
          label="Image url"
          handleChanges={this.changeUrl}
          value={this.props.movie.img}
        />
        <button
          type="submit"
          className="movie__add-movie"
          onClick={this.props.match.params.id
            ? this.editMovie
            : this.addMovie}
        >
          Add
        </button>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  movie: store.movies.movie,
})

const mapDispatchToProps = dispatch => ({
  onAddMovie(movie) {
    dispatch(addMovieAsync(movie));
  },
  clearMovie() {
    dispatch(clearMovie());
  },
  getMovie(id) {
    dispatch(getMovieAsync(id));
  },
  editMovie(movie, id) {
    dispatch(editMovieAsync(movie, id))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMovie);
