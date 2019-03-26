import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getSessionsAsync } from '../../actions/index'
import AddIcon from '@material-ui/icons/Add';
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
      <div className="session">
        {
          this.props.errors
            ? this.props.history.push('/error-page')
            : <div className="session">
              <div className="session__add-session">
                <span className="session__label"> Add session</span>
                <Link to="/add-session" className="movies_link">
                  <AddIcon className="session__add-icon" />
                </Link>
              </div>
              <ul className="session-halls">
                {
                  this.props.sessions.map(session => {
                    const times = session.times.map(time => new Date(+time).toLocaleString('en', OPTIONS));
                    return <li key={session.id}>
                      {`Minsk, ${session.cinemaId.name},
                      hall: small, ${(session.movieId.name).toLowerCase()},
                        ${times}`}
                    </li>
                  })
                }
              </ul>
              <button className="session__add-sessions">Add</button>
            </div>
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
