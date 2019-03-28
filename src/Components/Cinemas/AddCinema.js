import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import {
  addCinemaAsync,
  addHallsAsync,
  getCinemasAsync,
  clearHalls,
  deleteHall
} from '../../actions/index';
import AddIcon from '@material-ui/icons/Add';
import Input from '../Input/Input';
import Hall from '../Hall/Hall';
import './AddCinema.scss';


class AddCinema extends Component {
  state = {
    name: '',
    city: ''
  }

  componentDidMount() {
    this.props.getCinemasAsync();
  }

  changeCinema = (name) => {
    this.setState({ name });
  }

  changeCity = (city) => {
    this.setState({ city });
  }

  addCinema = () => {
    const cinema = {
      name: this.state.name,
      city: this.state.city
    };
    this.props.onAddСinema(cinema);
    this.props.onAddHalls((this.props.cinemas[this.props.cinemas.length - 1]).id, this.props.halls);
  }

  onDeleteHall = (hall) => {
    this.props.onDeleteHall(hall);
  }

  render() {
    return (
      <div className="cinema">
        <Input
          label="Cinema"
          handleChanges={this.changeCinema}
        />
        <Input
          label="City"
          handleChanges={this.changeCity}
        />
        <Link to="/add-hall" className="cinema__link link">
          <span className="link__label"> Add hall</span>
          <AddIcon className="link__add-icon" />
        </Link>
        <div className="cinema__halls halls">
          {
            this.props.halls.map(hall => {
              return <Hall name={hall.name} hall={hall} onDelete={this.onDeleteHall} />
            })
          }
        </div>
        <button className="cinema__add-cinema" onClick={this.addCinema}>Add</button>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  halls: store.halls.halls || [],
  cinemas: store.cinemas.cinemas || [],
})

const mapDispatchToProps = dispatch => ({
  onAddСinema(cinema) {
    dispatch(addCinemaAsync(cinema));
  },
  getCinemasAsync() {
    dispatch(getCinemasAsync());
  },
  onAddHalls(cinemaId, halls) {
    dispatch(addHallsAsync(cinemaId, halls));
    dispatch(clearHalls());
  },
  onDeleteHall(hall) {
    dispatch(deleteHall(hall));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCinema);
