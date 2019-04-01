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
  editCinemaAsync
} from '../../actions/index';
import AddIcon from '@material-ui/icons/Add';
import Input from '../Input/Input';
import Hall from '../Hall/Hall';
import './AddCinema.scss';


class AddCinema extends Component {
  state = {
    name: '' || this.props.match.params.name,
    city: '' || this.props.match.params.city
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
      ? this.props.onEditСinema(this.props.match.params.id, cinema)
      : this.props.onAddСinema(cinema, this.props.halls);
    /* this.props.onAddHalls((this.props.cinemas[this.props.cinemas.length - 1]).id, this.props.halls); */
    this.props.history.push(`/cinemas`);
    this.props.clearHalls();
  }

  onDeleteHall = (hall) => {
    this.props.match.params.id
      ? this.props.onDeleteHallAsync(hall)
      : this.props.onDeleteNewHall(hall)
  }

  onEditHall = (hall) => {
    const name = this.props.cinema.name || this.props.match.params.name;
    const city = this.props.cinema.city || this.props.match.params.city;
    if (hall.cinemaId) {
      this.props.history.push(`/edit/hall/name/${name}/city/${city}/${hall.id}`)
    } else {
      this.props.history.push(`/edit/new/hall/name/${name}/city/${city}`);
    }
  }

  render() {
    const name = this.props.cinema.name || this.props.match.params.name;
    const city = this.props.cinema.city || this.props.match.params.city;
    return (
      <div className="cinema">
        <Input
          label="Cinema"
          handleChanges={this.changeCinema}
          initialValue={name}
        />
        <Input
          label="City"
          handleChanges={this.changeCity}
          initialValue={city}
        />
        <Link
          to={{
            pathname: this.props.match.params.id
              ? `/add/newhall/${this.props.cinema.id || this.props.match.params.id}`
              : `/add/hall/name/${this.state.name || 'cinema'}/city/${this.state.city || 'city'}`
          }}
          className="cinema__link link"
        >
          <span className="link__label"> Add hall</span>
          <AddIcon className="link__add-icon" />
        </Link>
        <div className="cinema__halls halls">
          {
            this.props.halls.map(hall => {
              return (
                <Hall
                  name={hall.name}
                  hall={hall}
                  key={hall.hall + hall.name}
                  onDelete={this.onDeleteHall}
                  onEditHall={this.onEditHall}
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
  cinema: store.cinemas.cinema
})

const mapDispatchToProps = dispatch => ({
  onAddСinema(cinema, halls) {
    dispatch(addCinemaAsync(cinema, halls));
  },
  onEditСinema(id, cinema) {
    dispatch(editCinemaAsync(id, cinema));
  },
  getCinemasAsync() {
    dispatch(getCinemasAsync());
  },
  onAddHalls(cinemaId, halls) {
    dispatch(addHallsAsync(cinemaId, halls));
    dispatch(clearHalls());
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
