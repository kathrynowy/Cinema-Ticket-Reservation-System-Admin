import React, { Component } from 'react';

import CloseIcon from '@material-ui/icons/Close';
import "./Hall.scss";


class Hall extends Component {
  deleteHall = () => {
    this.props.onDelete(this.props.hall);
  }

  render() {
    return (
      <div className="hall">
        {this.props.name}
        <CloseIcon className="hall_close" onClick={this.deleteHall} />
      </div>
    );
  }
}

export default Hall;