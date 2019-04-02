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
  deleteHallAsync,
  clearRows
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


import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
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

  componentDidMount() {
    this.props.clearServices();
    this.props.clearCinema();
    const cinemaId = this.props.match.params.id;
    if (cinemaId) {
      this.props.getCinemasAsync();
      this.props.clearCinema();
      this.props.getCinema(cinemaId);
      if (!this.props.halls.length) {
        this.props.getHalls(cinemaId);
      }
    }
    if (!cinemaId) {
      this.props.clearCinemas();
    }
    this.props.clearCinemaInfo();
    this.props.clearRows();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id) {
      if (this.props.cinemas.length) {
        const cinema = nextProps.cinemas.find(cinema => cinema.id === this.props.match.params.id);
        if (nextProps.additionalServices.length) {
          this.props.onAddServices(nextProps.additionalServices);
          this.setState({
            additionalServices: nextProps.additionalServices
          });
        } else {
          this.props.onAddServices(cinema.additionalServices);
          this.setState({
            additionalServices: cinema.additionalServices
          });
        }
      }
    } else if (nextProps.additionalServices) {
      this.props.onAddServices(nextProps.additionalServices);
      this.setState({
        additionalServices: nextProps.additionalServices
      });
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
      name: this.state.name || this.props.cinema.name,
      city: this.state.city || this.props.cinema.city,
      additionalServices: this.state.additionalServices
    };
    await this.props.match.params.id
      ? this.props.onEditСinema(this.props.match.params.id, cinema, this.props.halls)
      : this.props.onAddСinema(cinema, this.props.halls);
    this.props.history.push(`/cinemas`);
    this.props.clearHalls();
    this.props.clearServices();
  }

  onDeleteHall = (hall) => {
    this.props.match.params.id
      ? this.props.onDeleteHallAsync(hall)
      : this.props.onDeleteNewHall(hall)
  }

  onEditHall = (hall, index) => {
    hall.cinemaId
      ? this.props.history.push(`/edit/${hall.cinemaId}/hall/${hall.id}`)
      : this.props.history.push(`/new/hall/edit/${index}`)
  }

  saveCinemaInfo = () => {
    this.props.saveCinemaInfo(this.state.name, this.state.city);
  }

  handleEditService = (index) => {
    let newAdditionalServices = this.state.additionalServices.map(service => {
      service.isEdit = false;
      return service;
    })

    newAdditionalServices[index].isEdit = true;
    this.setState({
      service: newAdditionalServices[index].name,
      cost: +newAdditionalServices[index].cost,
      additionalServices: newAdditionalServices
    })
  }

  handleConfirmEdit = (index) => {
    const newAdditionalServices = this.state.additionalServices;
    newAdditionalServices[index].name = this.state.service;
    newAdditionalServices[index].cost = this.state.cost;
    newAdditionalServices[index].isEdit = false;
    this.props.onEditService(newAdditionalServices[index]);
    this.setState({ additionalServices: newAdditionalServices });
  }

  addService = () => {
    const service = {
      name: this.state.service,
      cost: +this.state.cost
    }
    this.props.onAddService(service);
    this.setState({
      additionalServices: [...this.state.additionalServices, {
        name: service.name,
        cost: service.cost,
        isEdit: false,
        id: this.state.additionalServices.length
      }],
      service: '',
      cost: ''
    });
  }

  handleDelete = (index) => {
    this.props.deleteService(index);
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
            pathname: this.props.match.params.id
              ? `/add/newhall/${this.props.cinema.id || this.props.match.params.id}`
              : `/add/hall`
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
                  onEditHall={this.onEditHall}
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
        <button className="cinema__add-cinema" onClick={this.addCinema}>Add</button>
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
  onEditService(index, service) {
    dispatch(editService(index, service));
  },
  clearCinemaInfo() {
    dispatch(clearCinemaInfo());
  },
  onAddService(service) {
    dispatch(addService(service));
  },
  onAddServices(services) {
    dispatch(addServices(services));
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
  clearServices() {
    dispatch(clearServices());
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
  clearRows() {
    dispatch(clearRows());
  },
  deleteService(index) {
    dispatch(deleteService(index));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCinema);
