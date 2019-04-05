import React, { Component } from 'react';
import { connect } from 'react-redux';

import './AddSession.scss';
import { validateAll } from 'indicative';
import CustomDatePicker from '../Pickers/DatePicker';
import CustomSelect from '../Select/Select';
import { cities } from '../cities';

import {
  getCinemasByCity,
  getHallsByCinemaId,
  addTime,
  deleteTime,
  addSessionAsync,
  editSessionAsync,
  getSessionsAsync,
  clearTimes
} from '../../actions/session'

import {
  getMoviesAsync
} from '../../actions/movie'

import {
  Delete as DeleteIcon
} from '@material-ui/icons';

const DATE_TIME_OPTIONS = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};


class AddSession extends Component {
  state = {
    city: '',
    cinema: '',
    movie: '',
    hall: '',
    date: ''
  }

  componentDidMount() {
    this.props.clearTimes();
    this.props.getSessionsAsync();
    this.props.getMovies();
  }

  onSelectCity = city => {
    this.setState({ city });

    this.props.getCinemas(city.name);
  }

  onSelectCinema = cinema => {
    this.setState({ cinema });

    this.props.getHalls(cinema.id);
  }

  onSelectHall = hall => this.setState({ hall });

  onSelectMovie = movie => this.setState({ movie });

  onSelectDate = date => {
    this.setState({ date });
    this.props.addTime(date);
  }

  onAddSession = async () => {
    const newSession = {
      times: this.props.times,
      cinemaId: this.state.cinema.id,
      movieId: this.state.movie.id,
      hallId: this.state.hall.id
    }
    const existSession = this.props.sessions.find(session => {
      return (session.cinemaId.id === newSession.cinemaId
        && session.hallId.id === newSession.hallId
        && session.movieId.id === newSession.movieId)
    })
    if (existSession) {
      newSession.times = [...newSession.times, ...existSession.times];
      await this.props.editSession(newSession, existSession.id);
    } else {
      await this.props.addSession(newSession);
    }
    this.props.history.push("/sessions");
  }

  handleDelete = index => {
    this.props.deleteTime(index);
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      errors: {}
    })
    console.log(this.state);
    const data = { ...this.state, times: this.props.times };
    console.log(data);
    const rules = {
      city: 'required',
      cinema: 'required',
      movie: 'required',
      hall: 'required',
      times: 'required'
    }

    const messages = {
      required: 'This {{ field }} is required.'
    }

    validateAll(data, rules, messages)
      .then(() => {
        console.log('success');
        this.onAddSession();
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
      <form className="session" onSubmit={(e) => this.handleSubmit(e)}>
        <span className="session__label"> City </span>
        <CustomSelect name="city" value={this.state.city} items={cities} onSelect={this.onSelectCity} />
        <span className="session_error">{this.state.errors ? this.state.errors.city : ''}</span>
        <span className="session__label"> Cinema </span>
        <CustomSelect name="cinema" value={this.state.cinema} items={this.props.cinemas} onSelect={this.onSelectCinema} />
        <span className="session_error">{this.state.errors ? this.state.errors.cinema : ''}</span>
        <span className="session__label"> Hall </span>
        <CustomSelect name="hall" value={this.state.hall} items={this.props.halls} onSelect={this.onSelectHall} />
        <span className="session_error">{this.state.errors ? this.state.errors.hall : ''}</span>
        <span className="session__label"> Movie </span>
        <CustomSelect name="movie" value={this.state.movie} items={this.props.movies} onSelect={this.onSelectMovie} />
        <span className="session_error">{this.state.errors ? this.state.errors.movie : ''}</span>
        <div className="session__add-time-button">
          <span className="session__label"> Add time</span>
          <CustomDatePicker type="date-time" label="Date & Time" onSelect={this.onSelectDate} />
        </div>
        <span className="session_error">{this.state.errors ? this.state.errors.times : ''}</span>

        <div className="session__dates">
          <ul className="session__date-list">
            {
              this.props.times.map((time, index) => {
                return (
                  <div className="session__list-item date" key={time}>
                    <li className="date__info">
                      {new Date(time).toLocaleString('en', DATE_TIME_OPTIONS)}
                    </li>
                    <DeleteIcon className="date__icon" onClick={() => this.handleDelete(index)} />
                  </div>
                );
              })
            }
          </ul>
        </div>
        <button type="submit" className="session__add" >Add</button>
      </form>
    );
  }
}

const mapStateToProps = store => ({
  cinemas: store.sessions.cinemas,
  halls: store.sessions.halls,
  sessions: store.sessions.sessions,
  times: store.sessions.times,
  movies: store.movies.movies
})

const mapDispatchToProps = dispatch => ({
  getCinemas(city) {
    dispatch(getCinemasByCity(city));
  },
  getSessionsAsync() {
    dispatch(getSessionsAsync());
  },
  addSession(session) {
    return dispatch(addSessionAsync(session));
  },
  editSession(session, id) {
    return dispatch(editSessionAsync(session, id));
  },
  getMovies() {
    dispatch(getMoviesAsync());
  },
  getHalls(cinemaId) {
    dispatch(getHallsByCinemaId(cinemaId));
  },
  addTime(date) {
    dispatch(addTime(date));
  },
  deleteTime(index) {
    dispatch(deleteTime(index));
  },
  clearTimes() {
    dispatch(clearTimes());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSession);
