import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddIcon from '@material-ui/icons/Add';
import Input from '../Input/Input';
import './AddHall.scss';
import { addHall, addRow, clearRows } from '../../actions/index'


class AddHall extends Component {
  state = {
    cost: 0,
    row: '',
    name: '',
    amountOfSeats: ''
  }

  addHall = () => {
    const hall = {
      name: this.state.name,
      hall: this.props.rows
    };
    this.props.onAddHall(hall);
    this.props.match.params.id
      ? this.props.history.push(`/edit/cinema/${this.props.match.params.id}`)
      : this.props.history.push(`/add/cinema`);
  }

  changeSeats = (amountOfSeats) => {
    this.setState({ amountOfSeats });
  }

  changeCost = (cost) => {
    this.setState({ cost });
  }

  changeHall = (name) => {
    this.setState({ name });
  }

  addRow = () => {
    const row = {
      row: this.props.rows.length + 1 || 0,
      amountOfSeats: +this.state.amountOfSeats,
      cost: +this.state.cost
    }
    this.props.onAddRow(row);
  }

  render() {
    return (
      <div className="hall-form">
        <Input
          label="Name"
          handleChanges={this.changeHall}
        />
        <div className="hall-form__info">
          <ul className="hall-form__row-list">
            {
              this.props.rows.map((row, index) => {
                return (
                  <li
                    className="hall-form__list-item row"
                  >
                    {`№${row.row} seats: ${row.amountOfSeats} cost: ${row.cost}`}
                  </li>
                );
              })
            }
          </ul>
        </div>
        <div className="hall-form__add-row">
          <div className="hall-form__add-row-button">
            <span className="hall-form__label"> Add row</span>
            <AddIcon className="hall-form__add-icon" onClick={this.addRow} />
          </div>
          <div className="hall-form__add-row-info">
            <Input
              label="Amount of seats"
              handleChanges={this.changeSeats}
            />
            <Input
              label="Cost"
              handleChanges={this.changeCost}
            />
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

const mapStateToProps = store => ({
  rows: store.halls.rows || [],
})

const mapDispatchToProps = dispatch => ({
  onAddHall(hall) {
    dispatch(addHall(hall));
    dispatch(clearRows());
  },
  onAddRow(row) {
    dispatch(addRow(row));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddHall);
