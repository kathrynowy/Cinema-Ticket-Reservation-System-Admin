import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import Input from '../Input/Input';
import './AddHall.scss';
import {
  addHall,
  addRow,
  clearRows,
  getHallAsync,
  addRows,
  clearHall,
  editHallAsync
} from '../../actions/index'


class AddHall extends Component {
  state = {
    name: '',
    amountOfSeats: '',
    cost: '',
    rows: this.props.rows.map((row, index) => {
      return ({
        id: index,
        isEdit: false,
        row: row.row,
        cost: row.cost,
        amountOfSeats: row.amountOfSeats,
        isEdit: false
      })
    })
  }

  componentDidMount() {
    const hallId = this.props.match.params.hallId;
    const cinemaId = this.props.match.params.cinemaId;
    const index = this.props.match.params.index;
    if (!hallId) {
      this.props.clearHall();
      this.props.clearRows();
    }

    if (hallId) {
      this.props.getHall(hallId);
      this.props.addRows(this.props.hall.hall || []);
    }

    if (index) {
      const i = +index;
      this.setState({
        name: this.props.halls[i].name,
        rows: this.props.halls[i].hall.map((row, index) => {
          return ({
            id: index,
            isEdit: false,
            row: row.row,
            cost: row.cost,
            amountOfSeats: row.amountOfSeats,
            isEdit: false
          })
        })
      })
    }
  }

  componentUnmount() {
    this.props.clearHall();
    this.props.clearRows();
  }

  addHall = () => {
    const hall = {
      name: this.state.name || this.props.hall.name,
      hall: this.state.rows || this.props.hall.rows
    };
    this.props.match.params.hallId
      ? this.props.onEditHall(hall, this.props.match.params.hallId)
      : this.props.onAddHall(hall)

    if (this.props.match.params.cinemaId || this.props.match.params.hallId) {
      this.props.history.push(`/edit/cinema/${this.props.match.params.cinemaId}`);
    } else {
      this.props.history.push(`/add/new/cinema`);
    }
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
      row: this.state.rows.length + 1 || 0,
      amountOfSeats: +this.state.amountOfSeats,
      cost: +this.state.cost
    }
    this.props.onAddRow(row);
    this.setState({
      rows: [...this.state.rows, { row: row.row, cost: row.cost, amountOfSeats: row.amountOfSeats, isEdit: false, id: row.row }]
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rows.length) this.setState({
      rows: nextProps.rows.map(row => {
        return { ...row, isEdit: false }
      })
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
    newRows[index].amountOfSeats = this.state.amountOfSeats;
    newRows[index].cost = this.state.cost;
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
          value={this.props.hall.name || this.state.name}
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
              value={this.state.amountOfSeats}
            />
            <Input
              label="Cost"
              handleChanges={this.changeCost}
              value={this.state.cost}
            />
          </div>
        </div>
        <div className="hall-form__info">
          <ul className="hall-form__row-list">
            {
              this.state.rows.map((row, index) => {
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
          {
            this.props.match.params.hallId || this.props.match.params.index ? 'Save' : 'Add'
          }
        </button>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  rows: store.halls.hall.hall || store.halls.rows || [],
  hall: store.halls.hall,
  halls: store.halls.halls
})

const mapDispatchToProps = dispatch => ({
  onAddHall(hall) {
    dispatch(addHall(hall));
    dispatch(clearRows());
  },
  onEditHall(hall, id) {
    dispatch(editHallAsync(hall, id));
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
