import React, { Component } from 'react';
import { connect } from 'react-redux';

import './AddMovie.scss';
import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea'
import { addMovieAsync } from '../../actions/index'


class AddMovie extends Component {
  addMovie = () => {
    const movie = {
      name: this.state.name,
      img: this.state.url,
      description: this.state.description
    }
    this.props.onAddMovie(movie);
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
        <Input label="Movie" handleChanges={this.changeMovie} />
        <Textarea
          label="Descripton"
          initialValue={this.props.movie.description}
          onChange={this.changeDescription}
        />
        <Input label="Image url" handleChanges={this.changeUrl} />
        <button type="submit" className="movie__add-movie" onClick={this.addMovie}> Add</button>
      </div >
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAddMovie(movie) {
    dispatch(addMovieAsync(movie));
  }
});

export default connect(null, mapDispatchToProps)(AddMovie);
