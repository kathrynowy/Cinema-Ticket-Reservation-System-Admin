import React, { Component } from 'react';
import './Textarea.scss';


class Textarea extends Component {
  state = {
    value: this.props.initialValue || ''
  }

  handleClear = () => {
    this.setState({
      value: ' '
    });
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    });
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <label className="textarea-container"> {this.props.label}
        <textarea
          className="textarea-container__textarea"
          onChange={(event) => this.handleChange(event)}
          value={this.state.value || this.props.initialValue}
        />
        <span className="textarea-container__error">{this.props.errorName}</span>
      </label>
    )
  }
}

export default Textarea;