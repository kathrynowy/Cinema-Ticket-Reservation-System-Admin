import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Close';

import './Input.scss';


class Input extends Component {
  state = {
    dirty: false,
    value: ''
  }

  handleClear = () => {
    this.setState({
      dirty: true,
      value: ''
    });
  }

  handleChange = (event) => {
    this.setState({
      dirty: true,
      value: event.target.value
    });
    this.props.handleChanges(event.target.value);
  }

  render() {
    return (
      <div className="input">
        <label className="input__label" >{this.props.label}
          <div className="input__container">
            <input
              type="text"
              name={this.props.label}
              className="input__input"
              onChange={(event) => this.handleChange(event)}
              value={this.state.dirty ? this.state.value : this.props.initialValue}
            />
            <button
              className={`input__clear`}
              onClick={this.handleClear}
              type="button"
            >
              <DeleteIcon />
            </button>
          </div>
        </label>
      </div>
    );
  }
}

export default Input;
