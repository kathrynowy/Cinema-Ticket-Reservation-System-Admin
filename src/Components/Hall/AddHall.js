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
  getHallAsync,
  clearHall,
  editHallAsync,
  editNewHall
} from '../../actions/hall';
import { validateAll } from 'indicative';


class AddHall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      amountOfSeats: '',
      cost: '',
      rows: []
    }
  }

  get isEdit() {
    return !!this.props.match.params.hallId;
  }

  get isCinemaExist() {
    return !!this.props.match.params.cinemaId;
  }

  componentDidMount() {
    const hallId = this.props.match.params.hallId;
    const i = +this.props.match.params.index;

    if (hallId) {
      this.props.getHall(hallId);
    } else {
      this.props.clearHall();
      if (i) {
        this.setState({
          name: this.props.halls[i].name,
          rows: this.props.halls[i].hall.map((row, hallIndex) => {
            return ({
              id: hallIndex,
              isEdit: false,
              row: row.row,
              cost: row.cost,
              amountOfSeats: row.amountOfSeats
            })
          })
        })
      }
    }
  }

  componentUnmount() {
    this.props.clearHall();
    this.props.clearHalls();
  }

  addHall() {
    const hall = {
      name: this.state.name,
      hall: this.state.rows
    };

    if (this.props.match.params.index) {
      this.props.editNewHall(hall, +(this.props.match.params.index))
    } else if (this.isEdit) {
      this.props.onEditHall(hall, this.props.match.params.hallId)
    } else {
      this.props.onAddHall(hall)
    }


    if (this.isCinemaExist || this.props.cinema.name) {
      this.props.history.push(`/cinema/${this.props.match.params.cinemaId || this.props.cinema.id}/edit`);
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
      row: this.state.rows.length + 1,
      amountOfSeats: +this.state.amountOfSeats,
      cost: +this.state.cost,
      isEdit: false,
      id: this.state.rows.length
    }
    this.setState({
      rows: [...this.state.rows, row]
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hall.hall) {
      this.setState({
        name: nextProps.hall.name,
        rows: nextProps.hall.hall.map((row, index) => {
          return { ...row, isEdit: false, id: index }
        })
      })
    }
  }

  handleEditRow = (index) => {
    let rows = this.state.rows.map((row, i) =>
      ({ ...row, isEdit: index === i })
    );

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

    this.setState({
      rows: rows
    })
  }

  handleDelete = (index) => {
    const newRows = this.state.rows.filter((row, i) => i !== index);
    this.setState({
      rows: newRows
    })
  }

  handleValidateRow() {
    this.setState({
      errors: {}
    })

    const data = { amount: this.state.amountOfSeats, cost: +this.state.cost };

    const rules = {
      amount: 'required|number|range:1,1000000',
      cost: 'required|number|range:1,1000000'
    }

    const messages = {
      required: 'This {{ field }} is required.',
      'cost.range': 'Cost must be more than 0',
      'amount.range': 'Amount of seats must be more than 0'
    }

    validateAll(data, rules, messages)
      .then(() => {
        this.addRow();
      })
      .catch(errors => {
        const formattesErrors = {};
        errors.forEach(error => formattesErrors[error.field] = error.message)
        this.setState({ errors: formattesErrors })
      })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      errors: {}
    })
    const data = { ...this.state };
    const rules = {
      name: 'required|string',
      rows: 'required|array'
    }

    const messages = {
      required: 'This {{ field }} is required.'
    }

    validateAll(data, rules, messages)
      .then(() => {
        this.addHall();
      })
      .catch(errors => {
        const formattesErrors = {};
        errors.forEach(error => formattesErrors[error.field] = error.message)
        this.setState({ errors: formattesErrors })
      })
  }

  render() {
    return (
      <form className="hall-form" onSubmit={(e) => this.handleSubmit(e)}>
        <Input
          label="Name"
          handleChanges={this.changeHall}
          value={this.state.name}
          errorName={this.state.errors && this.state.errors.name}
        />
        <div className="hall-form__add-row">
          <div className="hall-form__add-row-button">
            <span className="hall-form__label"> Add row</span>
            <AddIcon className="hall-form__add-icon" onClick={() => this.handleValidateRow()} />
          </div>
          <span className="hall-form_error">{this.state.errors && this.state.errors.rows}</span>
          <div className="hall-form__add-row-info">
            <Input
              label="Amount of seats"
              handleChanges={this.changeSeats}
              value={this.state.amountOfSeats}
              errorName={this.state.errors && this.state.errors.amount}
            />
            <Input
              label="Cost"
              handleChanges={this.changeCost}
              value={this.state.cost}
              errorName={this.state.errors && this.state.errors.cost}
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
                      {
                        this.state.rows[index].isEdit
                          ? <DoneIcon className="row__icon row__icon_confirm" onClick={() => this.handleConfirmEdit(index)} />
                          : <EditIcon className="row__icon row__icon_edit" onClick={() => this.handleEditRow(index)} />
                      }
                      <DeleteIcon className="row__icon" onClick={() => this.handleDelete(index)} />
                    </div>
                  </div>
                );
              })
            }
          </ul>
        </div>
        <button
          type="submit"
          className="hall-form__add-button"
        >
          {this.isEdit ? 'Save' : 'Add'}
        </button>
      </form>
    )
  }
}

const mapStateToProps = store => ({
  rows: store.halls.rows,
  hall: store.halls.hall,
  halls: store.halls.allHalls,
  cinema: store.cinemas.cinema
})

const mapDispatchToProps = dispatch => ({
  onAddHall(hall) {
    dispatch(addHall(hall));
  },
  onEditHall(hall, id) {
    dispatch(editHallAsync(hall, id));
  },
  getHall(id) {
    dispatch(getHallAsync(id));
  },
  clearHall() {
    dispatch(clearHall());
  },
  editNewHall() {
    dispatch(editNewHall());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddHall);
