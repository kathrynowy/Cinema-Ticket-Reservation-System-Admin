import React, { Component } from 'react';
import { connect } from 'react-redux';

import './AddSession.scss';

import Input from '../Input/Input';
import CustomDatePicker from '../Pickers/DatePicker';
import CustomSelect from '../Select/Select';
import { cities } from '../cities';

import {
  getCinemasByCity,
  getHallsByCinemaId
} from '../../actions/session'

class AddSession extends Component {
  state = {
    city: '',
    cinema: '',
    hall: ''
  }

  onSelectCity = (city) => {
    this.setState({
      city: city.name
    });

    this.props.getCinemas(city.name);
  }

  onSelectCinema = (cinema) => {
    this.setState({
      cinema
    });

    this.props.getHalls(cinema.id);
  }

  onSelectHall = (hall) => {
    this.setState({
      hall
    });

  }

  render() {
    return (
      <form className="session">
        <span className="session__label"> City </span>
        <CustomSelect name="city" value={this.state.city} items={cities} onSelect={this.onSelectCity} />
        <CustomSelect name="cinema" value={this.state.cinema} items={this.props.cinemas} onSelect={this.onSelectCinema} />
        <CustomSelect name="hall" value={this.state.hall} items={this.props.halls} onSelect={this.onSelectHall} />
        <Input label="Hall" />
        <Input label="Movie" />
        <Input label="Cost" />
        <CustomDatePicker type="date-time" label="Date & Time" />
        <button type="submit" className="session__add">Add</button>
      </form>
    );
  }
}

const mapStateToProps = store => ({
  cinemas: store.sessions.cinemas,
  halls: store.sessions.halls
})

const mapDispatchToProps = dispatch => ({
  getCinemas(city) {
    dispatch(getCinemasByCity(city));
  },
  getHalls(cinemaId) {
    dispatch(getHallsByCinemaId(cinemaId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSession);
