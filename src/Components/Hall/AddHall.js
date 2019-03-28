import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddIcon from '@material-ui/icons/Add';
import Input from '../Input/Input';
import './AddHall.scss';
import { addHallAsync } from '../../actions/index'


class AddHall extends Component {
  addHall = () => {
    const hall = {
      cinemaId: "5c8f6ae18a8fdcb1e0a78119",
      name: "newww",
      hall: [
        {
          row: 1,
          amountOfSeats: 8,
          cost: 8
        },
        {
          row: 2,
          amountOfSeats: 10,
          cost: 10
        }
      ]
    };
    this.props.onAddHall(hall);
  }

  render() {
    return (
      <div className="hall-form">
        <div className="hall-form__info">
          <ul className="hall-form__row-list">
            <li className="hall-form__list-item row">{`№1 seats: 10 cost: 12`}</li>
            <li className="hall-form__list-item row">{`№2 seats: 12 cost: 14`}</li>
            <li className="hall-form__list-item row">{`№3 seats: 12 cost: 16`}</li>
            <li className="hall-form__list-item row">{`№4 seats: 10 cost: 12`}</li>
          </ul>
        </div>
        <div className="hall-form__add-row">
          <div className="hall-form__add-row-button">
            <span className="hall-form__label"> Add row</span>
            <AddIcon className="hall-form__add-icon" />
          </div>
          <div className="hall-form__add-row-info">
            <Input label="Amount of seats" handleChanges={() => { }} />
            <Input label="Cost" handleChanges={() => { }} />
          </div>
        </div>
        <button
          type="button"
          className="hall-form__add-button"
          onClick={this.addHall}
        >
          Add hall
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onAddHall(hall) {
    dispatch(addHallAsync(hall));
  }
});

export default connect(null, mapDispatchToProps)(AddHall);
