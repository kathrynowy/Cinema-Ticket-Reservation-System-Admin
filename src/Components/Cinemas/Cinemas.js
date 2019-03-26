import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import DeleteIcon from '@material-ui/icons/Delete';
import { getCinemasAsync } from '../../actions/index'
import './Cinemas.scss';



class Cinemas extends Component {
  componentDidMount() {
    this.props.getCinemasAsync();
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
                      <li className="cinemas__list-item" key={cinema.id}>
                        <HomeIcon className="cinemas__home-icon" />
                        <span className="cinemas__cinema-info"> {cinema.name}</span>
                        <DeleteIcon className="cinemas__delete-icon" />
                      </li>
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Cinemas);
