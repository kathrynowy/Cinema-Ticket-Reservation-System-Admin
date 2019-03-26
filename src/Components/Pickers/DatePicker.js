import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { DatePicker, TimePicker, DateTimePicker } from 'material-ui-pickers';
import DeleteIcon from '@material-ui/icons/Close';



const styles = {
  grid: {
    width: '250px',
    justifyContent: 'flex-start',
    height: 35,
    backgroundColor: 'transparent',
    border: '2px solid #e7ce98',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 5

  },
  picker: {
    display: 'none',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  timeLabel: {
    width: 230,
    height: 20,
    alignSelf: 'center',
    paddingLeft: 5,
    textAlign: 'start'
  },
  label: {
    userSelect: 'none',
    fontSize: 18,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '10px 0px',
    paddingBottom: 8,
  }
};

const OPTIONS = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

class CustomDatePicker extends React.Component {
  choosePicker = (type, classes, selectedDate) => {
    switch (type) {
      case 'date':
        return <DatePicker className={classes.picker} value={selectedDate} onChange={this.handleDateChange} />

      case 'time':
        return <TimePicker className={classes.picker} value={selectedDate} onChange={this.handleDateChange} />

      case 'date-time':
        return <DateTimePicker mode="24h" className={classes.picker} value={selectedDate} onChange={this.handleDateChange} />

      default:
        return <div>Sorry... Error</div>
    }
  }

  handleClear = () => {
    this.setState({
      selectedDate: ''
    });
  }

  state = {
    selectedDate: new Date(),
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;

    return (
      <label className={classes.label}> {this.props.label}
        <div className={classes.grid}>
          <label className={classes.timeLabel}> {this.state.selectedDate.toLocaleString('en', OPTIONS)}
            {this.choosePicker(this.props.type, classes, selectedDate)}
          </label>
          <button
            className={`input__clear`}
            onClick={this.handleClear}
            type="button"
          >
            <DeleteIcon />
          </button>
        </div>
      </label>
    );
  }
}

CustomDatePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomDatePicker);
