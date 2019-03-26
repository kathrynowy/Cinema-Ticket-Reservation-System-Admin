import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './ErrorPage.scss'

class ErrorPage extends Component {
  state = {
    url: ''
  }

  componentDidMount() {
    this.getCat();
  }

  getCat = async () => {
    try {
      let response = await fetch('https://api.thecatapi.com/v1/images/search');
      let data = await response.json();
      this.setState({
        url: data[0].url
      })
    } catch (error) {
      console.log(error);
    }
  }

  render() {

    return (
      <div className="cats">
        <img className="cats__img" src={this.state.url} alt="cat" />
        <span className="cats__error"> Sorry.. Not Found </span>
      </div>
    )
  }
}

export default ErrorPage;