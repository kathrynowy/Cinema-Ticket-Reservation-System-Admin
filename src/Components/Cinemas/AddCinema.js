import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import {
  addCinemaAsync,
  addHallsAsync,
  getCinemasAsync,
  clearHalls,
  deleteNewHall,
  getCinemaAsync,
  clearCinema,
  getHallsAsync,
  deleteHallAsync,
  editCinemaAsync,
  saveCinemaInfo,
  clearCinemaInfo
} from '../../actions/index';
import AddIcon from '@material-ui/icons/Add';
import Input from '../Input/Input';
import Hall from '../Hall/Hall';
import './AddCinema.scss';


class AddCinema extends Component {
  state = {
    name: '' || this.props.cinema.name || this.props.newCinema.name,
    city: '' || this.props.cinema.city || this.props.newCinema.city
  }

  componentDidMount() {
    this.props.getCinemasAsync();
    const cinemaId = this.props.match.params.id;
    if (cinemaId) {
      this.props.clearCinema();
      this.props.getCinema(cinemaId);
      if (!this.props.halls.length) {
        this.props.getHalls(cinemaId);
      }
    }
    this.props.clearCinemaInfo();
  }

  componentWillUnmount() {
    this.props.clearCinema();
  }

  changeCinema = (name) => {
    this.setState({ name });
  }

  changeCity = (city) => {
    this.setState({ city });
  }

  addCinema = async () => {
    const cinema = {
      name: this.state.name || this.props.cinema.name,
      city: this.state.city || this.props.cinema.city
    };
    await this.props.match.params.id
      ? this.props.onEditСinema(this.props.match.params.id, cinema, this.props.halls)
      : this.props.onAddСinema(cinema, this.props.halls);
    this.props.history.push(`/cinemas`);
    this.props.clearHalls();
  }

  onDeleteHall = (hall) => {
    this.props.match.params.id
      ? this.props.onDeleteHallAsync(hall)
      : this.props.onDeleteNewHall(hall)
  }

  onEditHall = (hall, index) => {
    if (hall.cinemaId) {
      this.props.history.push(`/edit/${hall.cinemaId}/hall/${hall.id}`);
    } else {
      this.props.history.push(`/new/hall/edit/${index}`);
    }
  }

  saveCinemaInfo = () => {
    this.props.saveCinemaInfo(this.state.name, this.state.city);
  }

  render() {
    const name = this.state.name || this.props.cinema.name;
    const city = this.state.city || this.props.cinema.city;
    return (
      <div className="cinema">
        <Input
          label="Cinema"
          handleChanges={this.changeCinema}
          value={name}
        />
        <Input
          label="City"
          handleChanges={this.changeCity}
          value={city}
        />
        <Link
          to={{
            pathname: this.props.match.params.id
              ? `/add/newhall/${this.props.cinema.id || this.props.match.params.id}`
              : `/add/hall`
          }}
          className="cinema__link link"
          onClick={this.saveCinemaInfo}
        >
          <span className="link__label"> Add hall</span>
          <AddIcon className="link__add-icon" />
        </Link>
        <div className="cinema__halls halls">
          {
            this.props.halls.map((hall, index) => {
              return (
                <Hall
                  name={hall.name}
                  hall={hall}
                  key={index + hall.name}
                  onDelete={this.onDeleteHall}
                  onEditHall={this.onEditHall}
                  index={index}
                />
              );
            })
          }
        </div>
        <button className="cinema__add-cinema" onClick={this.addCinema}>Add</button>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  halls: store.halls.halls,
  cinemas: store.cinemas.cinemas,
  cinema: store.cinemas.cinema,
  newCinema: store.cinemas.newCinema
})

const mapDispatchToProps = dispatch => ({
  onAddСinema(cinema, halls) {
    dispatch(addCinemaAsync(cinema, halls));
  },
  clearCinemaInfo() {
    dispatch(clearCinemaInfo());
  },
  saveCinemaInfo(name, city) {
    dispatch(saveCinemaInfo(name, city));
  },
  onEditСinema(id, cinema, halls) {
    dispatch(editCinemaAsync(id, cinema));
    dispatch(addHallsAsync(id, halls));
    dispatch(clearHalls());
  },
  getCinemasAsync() {
    dispatch(getCinemasAsync());
  },
  onAddHalls(cinemaId, halls) {


  },
  onDeleteNewHall(hall) {
    dispatch(deleteNewHall(hall));
  },
  onDeleteHallAsync(hall) {
    dispatch(deleteHallAsync(hall));
  },
  clearCinema() {
    dispatch(clearCinema());
  },
  clearHalls() {
    dispatch(clearHalls());
  },
  getCinema(id) {
    dispatch(getCinemaAsync(id));
  },
  getHalls(id) {
    dispatch(getHallsAsync(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCinema);
