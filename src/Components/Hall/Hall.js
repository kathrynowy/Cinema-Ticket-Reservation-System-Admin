import React, { Component } from 'react';


import AddIcon from '@material-ui/icons/Add';
import Input from '../Input/Input';
import './Hall.scss';

class Hall extends Component {
  render() {
    return (
      <div className="hall">
        <div className="hall__info">
          <ul className="hall__row-list">
            <li className="hall__list-item row">{`№1 seats: 10 cost: 12`}</li>
            <li className="hall__list-item row">{`№2 seats: 12 cost: 14`}</li>
            <li className="hall__list-item row">{`№3 seats: 12 cost: 16`}</li>
            <li className="hall__list-item row">{`№4 seats: 10 cost: 12`}</li>
            <li className="hall__list-item row">{`№5 seats: 12 cost: 14`}</li>
            <li className="hall__list-item row">{`№6 seats: 12 cost: 16`}</li>
            <li className="hall__list-item row">{`№7 seats: 10 cost: 12`}</li>
            <li className="hall__list-item row">{`№8 seats: 12 cost: 14`}</li>
            <li className="hall__list-item row">{`№9 seats: 12 cost: 16`}</li>
          </ul>
        </div>
        <div className="hall__add-row">
          <div className="hall__add-row-button">
            <span className="hall__label"> Add row</span>
            <AddIcon className="hall__add-icon" />
          </div>
          <div className="hall__add-row-info">
            <Input label="Amount of seats" handleChanges={() => { }} />
            <Input label="Cost" handleChanges={() => { }} />
          </div>
        </div>
        <button type="button" className="hall__add-button">Add hall</button>
      </div>
    )
  }
}

export default Hall;