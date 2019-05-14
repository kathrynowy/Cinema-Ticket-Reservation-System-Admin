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
  constructor(props) {
    super(props);

    this.state = {
      description: props.movie.description || '',
      name: props.movie.name || '',
      url: props.movie.img || ''
    }
  }

  get isMovieExist() {
    return !!this.props.match.params.id;
  }

  async componentDidMount() {
    const movieId = this.props.match.params.id;
    if (movieId) {
      this.props.clearMovie();
      await this.props.getMovie(movieId);
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
        this.props.match.params.id
          ? this.editMovie()
          : this.addMovie()
      })
      .catch(errors => {
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
          value={this.state.name}
          errorName={this.state.errors && this.state.errors.name}
        />
        <Textarea
          label="Descripton"
          initialValue={this.state.description}
          onChange={this.changeDescription}
          errorName={this.state.errors && this.state.errors.description}
        />
        <Input
          label="Image url"
          handleChanges={this.changeUrl}
          value={this.state.url}
          errorName={this.state.errors && this.state.errors.url}
        />
        <button
          type="submit"
          className="movie__add-movie"
        >
          {this.isMovieExist ? 'Save' : 'Add'}
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
    return dispatch(getMovieAsync(id));
  },
  editMovie(movie, id) {
    dispatch(editMovieAsync(movie, id))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMovie);
