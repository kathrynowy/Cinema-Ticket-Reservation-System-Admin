import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddIcon from '@material-ui/icons/Add';
import Input from '../Input/Input';
import { Link } from "react-router-dom";
import './AddCinema.scss';
import { addCinemaAsync } from '../../actions/index'


class AddCinema extends Component {
  state = {
    name: '',
    city: ''
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
      city: this.state.city,
      halls: [{ id: "5c8f6ae18a8fdcb1e0a7811c" }]
    };
    this.props.onAddСinema(cinema);
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
        <div className="halls"> </div>
        <button className="cinema__add-cinema" onClick={this.addCinema}>Add</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAddСinema(cinema) {
    dispatch(addCinemaAsync(cinema));
  }
});

export default connect(null, mapDispatchToProps)(AddCinema);
