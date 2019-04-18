import React, { Component } from 'react';


import { Add as AddIcon } from '@material-ui/icons';
import './DragDropHall.scss';

export default class DragDropHall extends Component {
  state = {
    seatsInfo: [
      {
        category: "standard",
        color: "rgb(243, 233, 142)"
      },

      {
        category: "love",
        color: "rgb(233, 138, 161)"
      }
    ],
    row: [],
    rows: []
  }

  onDragOver = (ev) => {
    ev.preventDefault();
  }

  onDragStart = (ev, category) => {
    console.log(category);
    ev.dataTransfer.setData("category", category);
    ev.target.style.cursor = 'grab';
  }

  onDrop = (ev) => {
    let category = ev.dataTransfer.getData("category");

    let row = [...this.state.row];
    row.push(
      <div className={category === "love" ? "seats__seat_love" : "seats__seat_standard"} >
      </div>)

    this.setState({ ...this.state, row });
  }

  addRow = () => {
    let newRows = [...this.state.rows];
    newRows.push(this.state.row);
    this.setState({
      rows: newRows,
      row: []
    })
  }

  render() {
    let seats = [];
    this.state.seatsInfo.forEach((seat) => {
      seats.push(
        <div
          onDragStart={(e) => this.onDragStart(e, seat.category)}
          draggable
          className={seat.category === "love" ? "seats__seat_love" : "seats__seat_standard"}
          style={{ backgroundColor: seat.color }}
        >
        </div>
      );
    });

    return (
      <div className="container-drag">
        <div className="container-drag__add-row add-row">
          <div
            className="add-row__row"
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => { this.onDrop(e) }}
          >
            {this.state.row}
          </div>
          <AddIcon className="add-row__add-icon" onClick={() => this.addRow()} />
        </div>

        <div className="container-drag__hall hall">
          {this.state.rows.map(row => <div className="hall__row">{row}</div>)}
        </div>

        <div className="container-drag__seats seats">
          <span className="seats__label">Seat types</span>

          <div className="seats__drag-seats">
            {seats}
          </div>

          <div className="seats__cost">
          </div>
        </div>

      </div>
    );
  }
}
