import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Close';

import './Input.scss';


class Input extends Component {
  handleClear = () => {
    this.props.handleChanges('');
  }

  handleChange = (event) => {
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
              value={this.props.value}
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
