import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import AddIcon from '@material-ui/icons/Add';
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
            : <div className="cinemas">
              <div className="cinemas__add-cinema">
                <span className="cinemas__label"> Add cinema</span>
                <Link to="/add-cinema" className="cinemas_link">
                  <AddIcon className="cinemas__add-icon" />
                </Link>
              </div>

              <ul className="cinemas__list">
                {
                  this.props.cinemas.map((cinema) => <li className="cinemas__list-item" key={cinema.id}>{cinema.name}</li>)
                }
              </ul>
            </div>
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
