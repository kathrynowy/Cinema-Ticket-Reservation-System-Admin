import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Done as DoneIcon
} from '@material-ui/icons';
import Input from '../Input/Input';
import './AddHall.scss';
import {
  addHall,
  addRow,
  clearRows,
  getHallAsync,
  addRows,
  clearHall,
  editHallAsync,
  deleteRow,
  editRow
} from '../../actions/hall'


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
        amountOfSeats: row.amountOfSeats
      })
    })
  }

  get isEdit() {
    return !!this.props.match.params.hallId;
  }

  get isCinemaExist() {
    return !!this.props.match.params.cinemaId;
  }

  componentDidMount() {
    const hallId = this.props.match.params.hallId;
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
            amountOfSeats: row.amountOfSeats
          })
        })
      })
    }
  }

  componentUnmount() {
    this.props.clearHall();
    this.props.clearHalls();
    this.props.clearRows();
  }

  addHall() {
    const hall = {
      name: this.state.name,
      hall: this.state.rows
    };
    this.isEdit
      ? this.props.onEditHall(hall, this.props.match.params.hallId)
      : this.props.onAddHall(hall)

    if (this.isCinemaExist) {
      this.props.history.push(`/cinema/${this.props.match.params.cinemaId}/edit`);
    } else {
      this.props.history.push(`/cinema/add`);
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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rows.length) {
      this.props.addRows(nextProps.rows);
      this.setState({
        rows: nextProps.rows.map((row, index) => {
          return { ...row, isEdit: false, id: index }
        })
      })
    } else if (nextProps.hall.hall) {
      this.props.addRows(nextProps.hall.hall);
      this.setState({
        rows: nextProps.hall.hall.map((row, index) => {
          return { ...row, isEdit: false, id: index }
        })
      })
    }
  }

  handleEditRow = (index) => {
    let rows = this.state.rows.map(row => {
      row.isEdit = false;
      return row;
    })

    rows[index].isEdit = true;
    this.setState({
      rows: rows,
      cost: +rows[index].cost,
      amountOfSeats: +rows[index].amountOfSeats
    })
  }

  handleConfirmEdit = (index) => {
    const rows = this.state.rows;
    rows[index].isEdit = false;
    rows[index].amountOfSeats = this.state.amountOfSeats;
    rows[index].cost = +this.state.cost;
    this.props.onEditRow(index, rows[index]);
    this.setState({
      rows: rows
    })
  }

  handleDelete = (index) => {
    this.props.deleteRow(index);
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
                      <DeleteIcon className="row__icon" onClick={() => this.handleDelete(index)} />
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
            this.isEdit ? 'Save' : 'Add'
          }
        </button>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  rows: store.halls.rows,
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
  onEditRow(index, row) {
    dispatch(editRow(index, row));
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
  },
  deleteRow(index) {
    dispatch(deleteRow(index));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddHall);
