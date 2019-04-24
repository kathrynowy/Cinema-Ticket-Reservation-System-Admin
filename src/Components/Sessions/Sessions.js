import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getSessionsAsync, deleteSessionAsync, editSessionAsync } from '../../actions/session';
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

const MILLISECONDS_IN_HOUR = 1000 * 3600;
const MILLISECONDS_IN_MINUTE = 1000 * 60;
const MINUTES_IN_HOUR = 60;

class Sessions extends Component {
  async componentDidMount() {
    await this.props.getSessionsAsync();
  }

  deleteSession = (id, currentTime) => {
    const session = this.props.sessions.find(session => session.id === id);
    this.props.deleteSessionAsync(session, id, currentTime);
  }

  getHours(milliseconds) {
    return Math.floor(milliseconds / MILLISECONDS_IN_HOUR);
  }

  getMinutes(milliseconds, hours) {
    return (milliseconds / MILLISECONDS_IN_MINUTE) - hours * MINUTES_IN_HOUR;
  }

  render() {
    return (
      <div className="sessions">
        {
          this.props.errors
            ? this.props.history.push('/error-page')
            : this.props.sessions && <Fragment>
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
                      times.map((time, index) =>
                        <li key={session.id + times[index]} className="sessions__list-item session">
                          <EventIcon className="session__icon" />
                          <div className="session__name session-info">
                            <span className="session-info__movie">
                              {`${session.movieId.name}, ${this.getHours(session.movieId.runningTime)}h ${this.getMinutes(session.movieId.runningTime, this.getHours(session.movieId.runningTime))}m`}
                            </span>

                            <div className="session-info__info">
                              <div className="session-info__place">
                                <span className="session-info__city">{session.cinemaId.city},</span>
                                <span className="ticket__cinema">{session.cinemaId.name}</span>
                              </div>

                              <div className="session-info__hall-info">
                                <span>hall: {session.hallId.name}</span>
                              </div>

                              <span className="session-info__time">{time}</span>
                            </div>
                          </div>
                          <DeleteIcon className="session__icon session__icon_delete" onClick={() => this.deleteSession(session.id, session.times[index])} />
                        </li>
                      )
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
    return dispatch(getSessionsAsync());
  },
  deleteSessionAsync(session, id, currentTime) {
    dispatch(deleteSessionAsync(session, id, currentTime));
  },
  editSession(session, id) {
    dispatch(editSessionAsync(session, id))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);
