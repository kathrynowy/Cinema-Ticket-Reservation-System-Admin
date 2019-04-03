import React, { Component } from 'react';
import { connect } from 'react-redux';

import './AddSession.scss';

import Input from '../Input/Input';
import CustomDatePicker from '../Pickers/DatePicker';
import CustomSelect from '../Select/Select';
import { cities } from '../cities';

import {
  getCinemasByCity,
  getHallsByCinemaId,
  addTime
} from '../../actions/session'

import {
  getMoviesAsync
} from '../../actions/movie'

import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Done as DoneIcon
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

  onChangeCost = cost => this.setState({ cost });

  onAddSession = () => {
    const session = {

    }
  }

  render() {
    return (
      <form className="session">
        <span className="session__label"> City </span>
        <CustomSelect name="city" value={this.state.city} items={cities} onSelect={this.onSelectCity} />
        <span className="session__label"> Cinema </span>
        <CustomSelect name="cinema" value={this.state.cinema} items={this.props.cinemas} onSelect={this.onSelectCinema} />
        <span className="session__label"> Hall </span>
        <CustomSelect name="hall" value={this.state.hall} items={this.props.halls} onSelect={this.onSelectHall} />
        <span className="session__label"> Movie </span>
        <CustomSelect name="movie" value={this.state.movie} items={this.props.movies} onSelect={this.onSelectMovie} />
        <Input label="Cost" handleChanges={this.onChangeCost} value={this.state.cost} />
        <div className="session__add-time-button">
          <span className="session__label"> Add time</span>
          <CustomDatePicker type="date-time" label="Date & Time" onSelect={this.onSelectDate} />
        </div>
        <div className="session__dates">
          <ul className="session__date-list">
            {
              this.props.times.map((time, index) => {
                return (
                  <div className="session__list-item date" key={2}>
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

        <button type="submit" className="session__add" onClick={this.onAddSession}>Add</button>
      </form>
    );
  }
}

const mapStateToProps = store => ({
  cinemas: store.sessions.cinemas,
  halls: store.sessions.halls,
  times: store.sessions.times,
  movies: store.movies.movies
})

const mapDispatchToProps = dispatch => ({
  getCinemas(city) {
    dispatch(getCinemasByCity(city));
  },
  getMovies() {
    dispatch(getMoviesAsync());
  },
  getHalls(cinemaId) {
    dispatch(getHallsByCinemaId(cinemaId));
  },
  addTime(date) {
    dispatch(addTime(date));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSession);
