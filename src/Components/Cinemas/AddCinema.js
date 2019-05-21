import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import {
  addHallsAsync,
  clearHalls,
  deleteNewHall,
  getHallsAsync,
  deleteHallAsync
} from '../../actions/hall'

import {
  addCinemaAsync,
  getCinemasAsync,
  getCinemaAsync,
  clearCinema,
  editCinemaAsync,
  saveCinemaInfo,
  clearCinemaInfo,
  clearCinemas
} from '../../actions/cinema';

import { showSnackbar } from '../../actions/snackbar';

import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Done as DoneIcon
} from '@material-ui/icons';
import Input from '../Input/Input';
import Hall from '../Hall/Hall';
import './AddCinema.scss';
import { validateAll } from 'indicative';


class AddCinema extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '' || props.cinema.name || props.newCinema.name,
      city: '' || props.cinema.city || props.newCinema.city,
      service: '',
      cost: '',
      additionalServices: []
    }
  }

  get isCinemaExist() {
    return !!this.props.match.params.id;
  }

  componentDidMount() {
    this.props.clearCinemaInfo();
    const cinemaId = this.props.match.params.id;
    if (cinemaId) {
      this.props.getCinemasAsync();
      this.props.getCinema(cinemaId);
      this.props.halls.length ? this.props.clearCinemas() : this.props.getHalls(cinemaId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id) {
      if (this.props.cinemas.length) {
        const cinema = nextProps.cinemas.find(cinema => cinema.id === this.props.match.params.id);
        cinema && this.setState({
          name: cinema.name,
          city: cinema.city,
          additionalServices: cinema.additionalServices || []
        })
      }
    }
  }

  changeCinema = (name) => {
    this.setState({ name });
  }

  changeCity = (city) => {
    this.setState({ city });
  }

  changeCost = (cost) => {
    this.setState({ cost: +cost });
  }

  changeService = (service) => {
    this.setState({ service });
  }

  addCinema = async () => {
    const cinema = {
      name: this.state.name,
      city: this.state.city,
      additionalServices: this.state.additionalServices.map(({ name, cost }) => ({ name, cost }))
    };

    if (this.isCinemaExist) {
      await this.props.onEditСinema(this.props.match.params.id, cinema, this.props.halls)
    } else {
      for (let i = 0; i < this.props.cinemas.length; i++) {
        if (this.props.cinemas[i].name === cinema.name && this.props.cinemas[i].city === cinema.city) {
          return this.props.showSnackbar('This name is already exists');
        }
      }
      await this.props.onAddСinema(cinema, this.props.halls);
    }

    this.props.clearHalls();
    this.props.history.push(`/cinemas`);
  }

  onDeleteHall = (hall) => {
    hall.cinemaId
      ? this.props.onDeleteHallAsync(hall)
      : this.props.onDeleteNewHall(hall)
  }

  redirectToEditHall = (hall, index) => {
    if (hall.cinemaId) {
      this.props.history.push(`/cinema/${hall.cinemaId}/hall/${hall.id}/edit`);
    } else {
      this.props.history.push(`/cinema/hall/${index}/edit`);
    }
  }

  saveCinemaInfo = () => {
    this.props.saveCinemaInfo(this.state.name, this.state.city);
  }

  handleEditService = (index) => {
    let newAdditionalServices = this.state.additionalServices.map((service, i) =>
      ({ ...service, isEdit: index === i })
    );

    this.setState({
      service: newAdditionalServices[index].name,
      cost: +newAdditionalServices[index].cost,
      additionalServices: newAdditionalServices
    })
  }

  handleConfirmEdit = (index) => {
    const newAdditionalServices = [...this.state.additionalServices];
    newAdditionalServices[index].name = this.state.service;
    newAdditionalServices[index].cost = this.state.cost;
    newAdditionalServices[index].isEdit = false;

    this.setState({ additionalServices: newAdditionalServices });
  }

  addService = (service) => {
    this.setState({
      additionalServices: [...this.state.additionalServices, {
        name: service.name,
        cost: service.cost,
        isEdit: false,
      }],
      service: '',
      cost: ''
    });
  }

  handleValidateService() {
    this.setState({
      errors: {}
    })

    const service = {
      name: this.state.service,
      cost: +this.state.cost
    }

    const data = { service: service.name, cost: service.cost };
    const rules = {
      service: 'required|string',
      cost: 'required|number|range:1,1000000'
    }

    const messages = {
      required: 'This {{ field }} is required.',
      'cost.range': 'Cost must be more than 0'
    }

    validateAll(data, rules, messages)
      .then(() => {
        this.addService(service);
      })
      .catch(errors => {
        const formattesErrors = {};
        errors.forEach(error => formattesErrors[error.field] = error.message)
        this.setState({ errors: formattesErrors })
      })
  }

  handleDelete = (index) => {
    const newServices = this.state.additionalServices.filter((service, i) => i !== index);
    this.setState({
      additionalServices: newServices
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      errors: {}
    });

    const data = { ...this.state, halls: this.props.halls };
    const rules = {
      city: 'required|string',
      name: 'required|string',
      halls: 'required',
      additionalServices: 'required'
    }

    const messages = {
      required: 'This {{ field }} is required.'
    }

    validateAll(data, rules, messages)
      .then(() => this.addCinema())
      .catch(errors => {
        const formattesErrors = {};
        errors.forEach(error => formattesErrors[error.field] = error.message)
        this.setState({ errors: formattesErrors })
      })
  }

  render() {
    return (
      <form className="cinema" onSubmit={(e) => this.handleSubmit(e)}>
        <Input
          label="Cinema"
          handleChanges={this.changeCinema}
          value={this.state.name}
          errorName={this.state.errors && this.state.errors.name}
        />
        <Input
          label="City"
          handleChanges={this.changeCity}
          value={this.state.city}
          errorName={this.state.errors && this.state.errors.city}
        />
        <Link
          to={{
            pathname: this.isCinemaExist
              ? `/cinema/${this.props.cinema.id || this.props.match.params.id}/hall/add`
              : `/cinema/hall/add`
          }}
          className="cinema__link link"
          onClick={this.saveCinemaInfo}
        >
          <span className="link__label"> Add hall</span>
          <AddIcon className="link__add-icon" />
        </Link>
        <span className="cinema_error">{this.state.errors && this.state.errors.halls}</span>
        <div className="cinema__halls halls">
          {
            this.props.halls.map((hall, index) => {
              return (
                <Hall
                  name={hall.name}
                  hall={hall}
                  key={index + hall.name}
                  onDelete={this.onDeleteHall}
                  onEditHall={this.redirectToEditHall}
                  index={index}
                />
              );
            })
          }
        </div>
        <div
          className="cinema__add-service link"
          onClick={() => this.handleValidateService()}
        >
          <span className="link__label"> Add additional service</span>
          <AddIcon className="link__add-icon" />
        </div>
        <span className="cinema_error">{this.state.errors && this.state.errors.additionalServices}</span>
        <Input
          label="Service"
          handleChanges={this.changeService}
          value={this.state.service}
          errorName={this.state.errors && this.state.errors.service}
        />
        <Input
          label="Cost"
          handleChanges={this.changeCost}
          value={this.state.cost}
          errorName={this.state.errors && this.state.errors.cost}
        />
        <div className="cinema__services services">
          <ul className="services__row-list">
            {
              this.state.additionalServices.map((service, index) => {
                return (
                  <div className="services __list-item row" key={service + index}>
                    <li className="row__info">
                      {`service: ${service.name}, cost: ${service.cost}`}
                    </li>
                    <div className="row__icons">
                      {!this.state.additionalServices[index].isEdit && <EditIcon className="row__icon row__icon_edit" onClick={() => this.handleEditService(index)} />}
                      {this.state.additionalServices[index].isEdit && <DoneIcon className="row__icon row__icon_confirm" onClick={() => this.handleConfirmEdit(index)} />}
                      <DeleteIcon className="row__icon" onClick={() => this.handleDelete(index)} />
                    </div>
                  </div>
                );
              })
            }
          </ul>
        </div>
        <button type="submit" className="cinema__add-cinema">
          {this.props.match.params.id ? 'Save' : 'Add'}
        </button>
      </form>
    );
  }
}

const mapStateToProps = store => ({
  halls: store.halls.allHalls,
  cinemas: store.cinemas.allCinemas,
  cinema: store.cinemas.cinema,
  newCinema: store.cinemas.newCinema,
  additionalServices: store.services.allAdditionalServices
})

const mapDispatchToProps = dispatch => ({
  onAddСinema(cinema, halls) {
    return dispatch(addCinemaAsync(cinema, halls));
  },
  clearHalls() {
    dispatch(clearHalls());
  },
  clearCinemaInfo() {
    dispatch(clearCinemaInfo());
    dispatch(clearCinema());
  },
  saveCinemaInfo(name, city) {
    dispatch(saveCinemaInfo(name, city));
  },
  showSnackbar(message) {
    dispatch(showSnackbar(message));
  },
  onEditСinema(id, cinema, halls) {
    dispatch(editCinemaAsync(id, cinema));
    dispatch(addHallsAsync(id, halls));
    dispatch(clearHalls());
  },
  getCinemasAsync() {
    dispatch(getCinemasAsync());
  },
  onDeleteNewHall(hall) {
    dispatch(deleteNewHall(hall));
  },
  onDeleteHallAsync(hall) {
    dispatch(deleteHallAsync(hall));
  },
  clearCinemas() {
    dispatch(clearCinemas());
  },
  getCinema(id) {
    dispatch(getCinemaAsync(id));
  },
  getHalls(id) {
    dispatch(getHallsAsync(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCinema);
