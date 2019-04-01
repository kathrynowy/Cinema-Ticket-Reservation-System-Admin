import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import Input from '../Input/Input';
import './AddHall.scss';
import { addHall, addRow, clearRows, getHallAsync, addRows, clearHall } from '../../actions/index'


class AddHall extends Component {
  state = {
    name: '',
    amountOfSeats: '',
    cost: '',
    isEdit: false,
    rows: this.props.rows.map((row, index) => {
      console.log(row);
      return ({
        id: index,
        isEdit: false,
        row: row.row,
        cost: row.cost,
        amountOfSeats: row.amountOfSeats
      })
    })
  }

  componentDidMount() {
    const hallId = this.props.match.params.hallId;
    const cinemaId = this.props.match.params.cinemaId;
    if (!hallId) {
      this.props.clearHall();
      this.props.clearRows();
    }

    if (hallId) {
      this.props.getHall(hallId);
      this.props.addRows(this.props.hall.hall);
    }
  }

  componentUnmount() {
    this.props.clearHall();
    this.props.clearRows()
  }

  addHall = () => {
    const hall = {
      name: this.state.name,
      hall: this.props.rows
    };
    if (this.props.match.params.hallId) {

    }
    this.props.onAddHall(hall);
    this.props.match.params.cinemaId
      ? this.props.history.push(`/edit/cinema/${this.props.match.params.cinemaId}`)
      : this.props.history.push(`/add/new/cinema/name/${this.props.match.params.name}/city/${this.props.match.params.city}`);
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
    this.setState({
      rows: [...this.state.rows, { row: row.row, cost: row.cost, amountOfSeats: row.amountOfSeats, isEdit: false, id: row.row }]
    })
  }

  handleEditRow = (index) => {
    let newRows = this.state.rows.map(row => {
      row.isEdit = false;
      return row;
    })

    newRows[index].isEdit = true;
    this.setState({
      rows: newRows,
      cost: +newRows[index].cost,
      amountOfSeats: +newRows[index].amountOfSeats
    })
  }

  handleConfirmEdit = (index) => {
    const newRows = this.state.rows;
    newRows[index].isEdit = false;
    this.setState({
      rows: newRows
    })
  }

  render() {
    return (
      <div className="hall-form">
        <Input
          label="Name"
          handleChanges={this.changeHall}
          initialValue={this.props.hall.name || this.state.name}
        />
        <div className="hall-form__add-row">
          <div className="hall-form__add-row-button">
            <span className="hall-form__label"> Add row</span>
            <AddIcon className="hall-form__add-icon" onClick={this.addRow} />
          </div>
          <div className="hall-form__add-row-info">
            <Input
              label="Amount of seats"
              handleChanges={this.changeSeats}
              initialValue={this.state.amountOfSeats}
            />
            <Input
              label="Cost"
              handleChanges={this.changeCost}
              initialValue={this.state.cost}
            />
          </div>
        </div>
        <div className="hall-form__info">
          <ul className="hall-form__row-list">
            {
              this.props.rows.map((row, index) => {
                return (
                  <div className="hall-form__list-item row" key={row + index}>
                    <li className="row__info">
                      {`№${row.row} seats: ${row.amountOfSeats} cost: ${row.cost}`}
                    </li>
                    <div className="row__icons">
                      {!this.state.rows[index].isEdit && <EditIcon className="row__icon row__icon_edit" onClick={() => this.handleEditRow(index)} />}
                      {this.state.rows[index].isEdit && <DoneIcon className="row__icon row__icon_confirm" onClick={() => this.handleConfirmEdit(index)} />}
                      <DeleteIcon className="row__icon" />
                    </div>
                  </div>
                );
              })
            }
          </ul>
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
  rows: store.halls.hall.hall || store.halls.rows || [],
  hall: store.halls.hall
})

const mapDispatchToProps = dispatch => ({
  onAddHall(hall) {
    dispatch(addHall(hall));
    dispatch(clearRows());
  },
  onAddRow(row) {
    dispatch(addRow(row));
  },
  getHall(id) {
    dispatch(getHallAsync(id));
  },
  addRows(rows) {
    dispatch(addRows(rows));
  },
  clearHall() {
    dispatch(clearHall());
  },
  clearRows() {
    dispatch(clearRows());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddHall);
