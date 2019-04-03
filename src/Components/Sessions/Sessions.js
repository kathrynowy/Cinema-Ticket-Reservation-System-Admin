import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getSessionsAsync, deleteSessionAsync } from '../../actions/session';
import {
  Add as AddIcon,
  Event as EventIcon,
  Delete as DeleteIcon
} from '@material-ui/icons';
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

  deleteSession = id => {
    this.props.deleteSessionAsync(id);
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
                <Link to="/session/add" className="movies_link">
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
                          {`${session.cinemaId.city}, ${session.cinemaId.name},
                          hall: ${session.hallId.name}, ${(session.movieId.name)},
                          ${times}`}
                        </span>
                        <DeleteIcon className="session__icon session__icon_delete" onClick={() => this.deleteSession(session.id)} />
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
  },
  deleteSessionAsync(id) {
    dispatch(deleteSessionAsync(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);
