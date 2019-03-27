import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getSessionsAsync } from '../../actions/index'
import AddIcon from '@material-ui/icons/Add';
import EventIcon from '@material-ui/icons/Event';
import DeleteIcon from '@material-ui/icons/Delete';
import './Session.scss';

const OPTIONS = {
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};


class Sessions extends Component {
  componentDidMount() {
    this.props.getSessionsAsync();
  }

  render() {

    return (
      <div className="sessions">
        {
          this.props.errors
            ? this.props.history.push('/error-page')
            : <Fragment>
              <div className="sessions__add-session">
                <span className="sessions__label"> Add session</span>
                <Link to="/add-session" className="movies_link">
                  <AddIcon className="sessions__add-icon" />
                </Link>
              </div>
              <ul className="sessions__list">
                {
                  this.props.sessions.map(session => {
                    const times = session.times.map(time => new Date(+time).toLocaleString('en', OPTIONS));
                    return (
                      <li key={session.id} className="sessions__list-item session">
                        <EventIcon className="session__icon" />
                        <span className="session__name">
                          {`Minsk, ${session.cinemaId.name},
                          hall: small, ${(session.movieId.name).toLowerCase()},
                          ${times}`}
                        </span>
                        <DeleteIcon className="session__icon session__icon_delete" />
                      </li>
                    )
                  })
                }
              </ul>
            </Fragment>
        }
      </div>
    );
  }
}

const mapStateToProps = store => ({
  sessions: store.sessions.sessions,
  errors: store.sessions.errors
})

const mapDispatchToProps = dispatch => ({
  getSessionsAsync() {
    dispatch(getSessionsAsync());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);
