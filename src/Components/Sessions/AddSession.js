import React, { Component } from 'react';
import { connect } from 'react-redux';

import './AddSession.scss';

import Input from '../Input/Input';
import CustomDatePicker from '../Pickers/DatePicker';
import CustomSelect from '../Select/Select';
import { cities } from '../cities';

import {
  getCinemasByCity
} from '../../actions/session'

class AddSession extends Component {

  onSelectCity = (city) => {
    this.setState({
      city: city
    });

    this.props.getCinemas(city);
  }

  render() {
    return (
      <form className="session">
        <span className="session__label"> City </span>
        <CustomSelect cities={cities} onSelectCity={this.onSelectCity} />
        <Input label="Cinema" />
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
  cinemas: store.sessions.cinemas
})

const mapDispatchToProps = dispatch => ({
  getCinemas(city) {
    dispatch(getCinemasByCity(city));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSession);
