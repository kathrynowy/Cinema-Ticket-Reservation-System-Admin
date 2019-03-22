import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Close';


class Input extends Component {
  state = {
    name: ''
  }

  handleClear = () => {
    this.setState({
      name: ''
    });
  }

  handleChange = (event) => {

    this.setState({
      name: event.target.value
    });
  }

  render() {
    return (
      <div className="input-container">
        <div className="input-container__square">
          <input
            type="text"
            className="input-container__input"
            id={`${this.props.inputName}-name`}
            onChange={(event) => this.handleChange(event)}
            ref={`input${this.props.inputName}`}
            value={this.state.name}
          />
          <button
            className={`input-container__${this.props.inputName}-close`}
            onClick={this.handleClear}
            type="button"
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    );
  }
}

export default Input;