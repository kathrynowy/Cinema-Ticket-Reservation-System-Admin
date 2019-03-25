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
    marginBottom: 20
  },
  picker: {
    display: 'none',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  label: {
    width: 230,
    height: 20,
    alignSelf: 'center',
    paddingLeft: 5,
    textAlign: 'start'
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
        return <DateTimePicker className={classes.picker} value={selectedDate} onChange={this.handleDateChange} />

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
      <div className={classes.grid}>
        <label className={classes.label}> {this.state.selectedDate.toLocaleString('en', OPTIONS)}
          {this.choosePicker(this.props.type, classes, selectedDate)}{/* <DatePicker className={classes.picker} value={selectedDate} onChange={this.handleDateChange} /> */}
        </label>
        <button
          className={`input__clear`}
          onClick={this.handleClear}
          type="button"
        >
          <DeleteIcon />
        </button>
      </div>
    );
  }
}

CustomDatePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomDatePicker);
