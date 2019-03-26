import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import AddIcon from '@material-ui/icons/Add';
import { getCinemasAsync } from '../../actions/index'
import './Cinemas.scss';

let url = '';

class Cinemas extends Component {
  componentDidMount() {
    this.props.getCinemasAsync();
  }

  getCat = async () => {
    try {
      let response = await fetch('https://api.thecatapi.com/v1/images/search');
      let data = await response.json();
      return url = data[0];
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const urll = this.getCat();
    return (
      <div className="cinemas">
        {
          this.props.errors
            ? <div className="cinemas__cats"> <img className="cinemas__cat-img" src={url.url} alt="cat" /> <span className="cinemas__cat-error"> {this.props.errors} </span> </div>
            : <div>
              <div className="cinemas__add-cinema">
                <span className="cinemas__label"> Add cinema</span>
                <Link to="/add-cinema" className="cinemas_link">
                  <AddIcon className="cinemas__add-icon" />
                </Link>
              </div>

              <ul className="cinemas__list">
                {
                  this.props.cinemas.map((cinema) => <li className="cinemas__list-item" key={cinema.id}>{cinema.name}</li>)
                }
              </ul>
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = store => ({
  cinemas: store.cinemas.cinemas,
  errors: store.cinemas.errors || ''
})

const mapDispatchToProps = dispatch => ({
  getCinemasAsync() {
    dispatch(getCinemasAsync());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Cinemas);
