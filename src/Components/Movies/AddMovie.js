import React, { Component } from 'react';
import { connect } from 'react-redux';

import { validateAll } from 'indicative';
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

  get isMovieExist() {
    return !!this.props.match.params.id;
  }

  componentDidMount() {
    const movieId = this.props.match.params.id;
    if (movieId) {
      this.props.clearMovie();
      this.props.getMovie(movieId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.movie) {
      this.setState({
        description: nextProps.movie.description,
        name: nextProps.movie.name,
        url: nextProps.movie.img
      })
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
    this.props.history.push(`/movies`);
  }

  editMovie = () => {
    const movie = {
      name: this.state.name,
      img: this.state.url,
      description: this.state.description
    }
    this.props.editMovie(movie, this.props.match.params.id);
    this.props.history.push(`/movies`);
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

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      errors: {}
    })
    console.log(this.state);
    const data = this.state;
    const rules = {
      name: 'required|string',
      url: 'required|url',
      description: 'required|string'
    }

    const messages = {
      required: 'This {{ field }} is required.',
      'url.url': 'The url is invalid.'
    }

    validateAll(data, rules, messages)
      .then(() => {
        console.log('success');
        this.props.match.params.id
          ? this.editMovie()
          : this.addMovie()
      })
      .catch(errors => {
        console.log(errors);
        const formattesErrors = {};
        errors.forEach(error => formattesErrors[error.field] = error.message)
        this.setState({ errors: formattesErrors })
      })
  }

  render() {
    return (
      <form className="movie" onSubmit={(e) => this.handleSubmit(e)}>
        <Input
          label="Movie"
          handleChanges={this.changeMovie}
          value={this.props.movie.name}
        />
        <span className="movie_error">{this.state.errors ? this.state.errors.name : ''}</span>
        <Textarea
          label="Descripton"
          initialValue={this.props.movie.description}
          onChange={this.changeDescription}
        />
        <span className="movie_error">{this.state.errors ? this.state.errors.description : ''}</span>
        <Input
          label="Image url"
          handleChanges={this.changeUrl}
          value={this.props.movie.img}
        />
        <span className="movie_error">{this.state.errors ? this.state.errors.url : ''}</span>
        <button
          type="submit"
          className="movie__add-movie"
        /* onClick={this.props.match.params.id
          ? this.editMovie
          : this.addMovie} */
        > {
            this.isMovieExist ? 'Save' : 'Add'
          }
        </button>
      </form>
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
