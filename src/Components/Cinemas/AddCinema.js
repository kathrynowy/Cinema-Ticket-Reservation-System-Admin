import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import {
  addService,
  clearServices,
  deleteService,
  addServices,
  editService
} from '../../actions/service'

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

import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Done as DoneIcon
} from '@material-ui/icons';
import Input from '../Input/Input';
import Hall from '../Hall/Hall';
import './AddCinema.scss';


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
    this.props.clearCinema();
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
        this.setState({
          name: cinema.name,
          city: cinema.city
        })
        if (nextProps.additionalServices.length) {
          this.setState({
            additionalServices: nextProps.additionalServices
          });
        } else {
          this.setState({
            additionalServices: cinema.additionalServices
          });
        }
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

  changeCost = (cost) => {
    this.setState({ cost });
  }

  changeService = (service) => {
    this.setState({ service });
  }

  addCinema = async () => {
    const cinema = {
      name: this.state.name,
      city: this.state.city,
      additionalServices: this.state.additionalServices.map(service => {
        return {
          name: service.name,
          cost: +service.cost
        }
      })
    };
    await this.isCinemaExist
      ? this.props.onEditСinema(this.props.match.params.id, cinema, this.props.halls)
      : this.props.onAddСinema(cinema, this.props.halls);
    this.props.history.push(`/cinemas`);
    this.props.clearHalls();
  }

  onDeleteHall = (hall) => {
    this.isCinemaExist
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

  addService = () => {
    const service = {
      name: this.state.service,
      cost: +this.state.cost
    }

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

  handleDelete = (index) => {
    const newServices = this.state.additionalServices.filter((service, i) => i !== index);
    this.setState({
      additionalServices: newServices
    })
  }

  render() {
    const name = this.state.name || this.props.cinema.name;
    const city = this.state.city || this.props.cinema.city;
    const cost = this.state.cost;
    const service = this.state.service;
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
          onClick={this.addService}
        >
          <span className="link__label"> Add additional service</span>
          <AddIcon className="link__add-icon" />
        </div>
        <Input
          label="Service"
          handleChanges={this.changeService}
          value={service}
        />
        <Input
          label="Cost"
          handleChanges={this.changeCost}
          value={cost}
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
        <button className="cinema__add-cinema" onClick={() => this.addCinema()}>
          {this.props.match.params.id ? 'Save' : 'Add'}
        </button>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  halls: store.halls.halls,
  cinemas: store.cinemas.cinemas,
  cinema: store.cinemas.cinema,
  newCinema: store.cinemas.newCinema,
  additionalServices: store.services.additionalServices
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
  onDeleteNewHall(hall) {
    dispatch(deleteNewHall(hall));
  },
  onDeleteHallAsync(hall) {
    dispatch(deleteHallAsync(hall));
  },
  clearCinema() {
    dispatch(clearCinema());
  },
  clearCinemas() {
    dispatch(clearCinemas());
  },
  clearHalls() {
    dispatch(clearHalls());
  },
  getCinema(id) {
    dispatch(getCinemaAsync(id));
  },
  getHalls(id) {
    dispatch(getHallsAsync(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCinema);
