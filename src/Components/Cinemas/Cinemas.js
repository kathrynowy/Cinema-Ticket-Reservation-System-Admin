import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  Add as AddIcon,
  Home as HomeIcon,
  Delete as DeleteIcon
} from '@material-ui/icons';

import {
  clearHalls,
  clearHall
} from '../../actions/hall';

import {
  getCinemasAsync,
  deleteCinemaAsync,
} from '../../actions/cinema';

import './Cinemas.scss';


class Cinemas extends Component {
  componentDidMount() {
    this.props.getCinemasAsync();
    this.props.clearHalls();
    this.props.clearHall();
  }

  deleteCinemaAsync = (id) => {
    this.props.deleteCinemaAsync(id);
  }

  render() {
    return (
      <div className="cinemas">
        {
          this.props.errors
            ? this.props.history.push('/error-page')
            : <Fragment >
              <div className="cinemas__add-cinema">
                <span className="cinemas__label"> Add cinema</span>
                <Link to="/cinema/add" className="cinemas_link">
                  <AddIcon className="cinemas__add-icon" />
                </Link>
              </div>

              <ul className="cinemas__list">
                {
                  this.props.cinemas.map((cinema) => {
                    return (
                      <div className="cinemas__list-item cinema" key={cinema.id}>
                        <HomeIcon className="cinema__icon" />
                        <Link to={{ pathname: `/cinema/edit/${cinema.id}` }} className="cinema__item-link">
                          <li className="cinema__name">
                            {cinema.name}
                          </li>
                        </Link>
                        <DeleteIcon
                          className="cinema__icon cinema__icon_delete"
                          onClick={() => this.deleteCinemaAsync(cinema.id)}
                        />
                      </div>
                    )
                  })
                }
              </ul>
            </Fragment>
        }
      </div>
    )
  }
}

const mapStateToProps = store => ({
  cinemas: store.cinemas.cinemas,
  errors: store.cinemas.errors
})

const mapDispatchToProps = dispatch => ({
  getCinemasAsync() {
    dispatch(getCinemasAsync());
  },
  clearHalls() {
    dispatch(clearHalls());
  },
  clearHall() {
    dispatch(clearHall());
  },
  deleteCinemaAsync(id) {
    dispatch(deleteCinemaAsync(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Cinemas);
