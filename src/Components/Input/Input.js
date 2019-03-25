import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Close';

import './Input.scss';


class Input extends Component {
  state = {
    value: ''
  }

  handleClear = () => {
    this.setState({
      value: ''
    });
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    return (
      <div className="input-container">
        <input
          type="text"
          className="input-container__input"
          id={`${this.props.inputName}-name`}
          onChange={(event) => this.handleChange(event)}
          value={this.state.value}
        />
        <button
          className={`input-container__clear`}
          onClick={this.handleClear}
          type="button"
        >
          <DeleteIcon />
        </button>
      </div>
    );
  }
}

export default Input;