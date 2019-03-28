import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import DeleteIcon from '@material-ui/icons/Delete';
import { getCinemasAsync, deleteCinemaAsync } from '../../actions/index'
import './Cinemas.scss';



class Cinemas extends Component {
  componentDidMount() {
    this.props.getCinemasAsync();
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
                <Link to="/add-cinema" className="cinemas_link">
                  <AddIcon className="cinemas__add-icon" />
                </Link>
              </div>

              <ul className="cinemas__list">
                {
                  this.props.cinemas.map((cinema) => {
                    return (
                      <div className="cinemas__list-link" key={cinema.id}>
                        <HomeIcon className="cinemas__icon" />
                        <li className="cinemas__list-item">
                          {cinema.name}
                        </li>
                        <DeleteIcon
                          className="cinemas__icon cinemas__icon_delete"
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
  deleteCinemaAsync(id) {
    dispatch(deleteCinemaAsync(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Cinemas);
