import React, { Component } from 'react';

import CloseIcon from '@material-ui/icons/Close';
import "./Hall.scss";


class Hall extends Component {
  render() {
    return (
      <div className="hall">
        {this.props.name}
        <CloseIcon className="hall_close" />
      </div>
    );
  }
}

export default Hall;