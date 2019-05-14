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
} from '../../actions/session';
import { showSnackbar } from '../../actions/snackbar';

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

  onSelectCity = async (city) => {
    this.setState({ city });
    await this.props.getCinemas(city.name);
  }

  onSelectCinema = cinema => {
    this.setState({ cinema });

    this.props.getHalls(cinema.id);
  }

  onSelectHall = hall => this.setState({ hall });

  onSelectMovie = movie => this.setState({ movie });

  onSelectDate = date => {
    const newSession = {
      times: this.props.times,
      cinemaId: this.state.cinema.id,
      movieId: this.state.movie.id,
      hallId: this.state.hall.id
    }

    const existingSession = this.isSessionExist(this.props.sessions, newSession);

    this.setState({ date });
    let isTimeAvailable = true;

    if (date < new Date().getTime()) {
      isTimeAvailable = false;
    } else if (existingSession) {
      const times = [...existingSession.times, ...this.props.times];
      isTimeAvailable = this.checkAvailable(times, date, this.state.movie.runningTime);
    } else {
      isTimeAvailable = this.checkAvailable(this.props.times, date, this.state.movie.runningTime);
    }

    isTimeAvailable
      ? this.props.addTime(date)
      : this.props.showSnackbar("it's wrong time")
  }

  isSessionExist(sessions, newSession) {
    return this.props.sessions.find(session => {
      return (session.cinemaId.id === newSession.cinemaId
        && session.hallId.id === newSession.hallId
        && session.movieId.id === newSession.movieId)
    })
  }

  checkAvailable(times, newSessionTime, length) {
    return times.every(time => time + length > newSessionTime || time < length + newSessionTime)
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

    const data = { ...this.state, times: this.props.times };
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
        this.onAddSession();
      })
      .catch(errors => {
        const formattesErrors = {};
        errors.forEach(error => formattesErrors[error.field] = error.message)
        this.setState({ errors: formattesErrors })
      })
  }

  render() {
    const isDisabled = !(this.state.movie && this.state.city && this.state.cinema && this.state.hall);
    return (
      <form className="session" onSubmit={(e) => this.handleSubmit(e)}>
        <span className="session__label"> City </span>
        <CustomSelect
          errorName={this.state.errors && this.state.errors.city}
          name="city" value={this.state.city}
          items={cities}
          onSelect={this.onSelectCity}
        />
        <span className="session__label"> Cinema </span>
        <CustomSelect
          errorName={this.state.errors && this.state.errors.cinema}
          name="cinema" value={this.state.cinema}
          items={this.props.cinemas || []}
          onSelect={this.onSelectCinema}
        />
        <span className="session__label"> Hall </span>
        <CustomSelect
          errorName={this.state.errors && this.state.errors.hall}
          name="hall"
          value={this.state.hall}
          items={this.props.halls || []}
          onSelect={this.onSelectHall}
        />
        <span className="session__label"> Movie </span>
        <CustomSelect
          errorName={this.state.errors && this.state.errors.movie}
          name="movie"
          value={this.state.movie}
          items={this.props.movies || []}
          onSelect={this.onSelectMovie}
        />
        <div className={"session__add-time-button" + (isDisabled ? " session__add-time-button_disabled" : " ")}>
          <span className="session__label"> Add time</span>
          <CustomDatePicker
            type="date-time"
            label="Date & Time"
            onSelect={(date) => this.onSelectDate(date)}
          />
        </div>
        <span className="session_error">{this.state.errors && this.state.errors.times}</span>
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
  sessions: store.sessions.allSessions,
  times: store.sessions.times,
  movies: store.movies.allMovies
})

const mapDispatchToProps = dispatch => ({
  getCinemas(city) {
    return dispatch(getCinemasByCity(city));
  },
  showSnackbar(message) {
    dispatch(showSnackbar(message));
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
