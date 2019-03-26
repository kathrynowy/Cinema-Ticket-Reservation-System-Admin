import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getSessionsAsync } from '../../actions/index'
import AddIcon from '@material-ui/icons/Add';
import './Session.scss';


class Sessions extends Component {
  componentDidMount() {
    this.props.getSessionsAsync();
  }

  render() {

    return (
      <div className="session">
        <div className="session__add-session">
          <span className="session__label"> Add session</span>
          <Link to="/add-session" className="movies_link">
            <AddIcon className="session__add-icon" />
          </Link>
        </div>
        <ul className="session-halls">
          {
            this.props.sessions.map(session => {
              const times = session.times.map(time => new Date(+time));
              return <li key={session.id}>
                {`city: minsk, cinema: ${session.cinemaId.name}, hall: small, movie: ${(session.movieId.name).toLowerCase()}, times: ${times}`}
              </li>
            })
          }
        </ul>
        <button className="session__add-sessions">Add</button>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  sessions: store.sessions.sessions
})

const mapDispatchToProps = dispatch => ({
  getSessionsAsync() {
    dispatch(getSessionsAsync());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);
