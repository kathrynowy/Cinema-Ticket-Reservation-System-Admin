import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { DateTimePicker } from 'material-ui-pickers';

import { Add as AddIcon } from '@material-ui/icons';


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
  addIcon: {
    border: '5px solid #e7ce98',
    backgroundColor: '#e7ce98',
    borderRadius: '50%',
    cursor: 'pointer',
  }

};

class CustomDatePicker extends React.Component {
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
    this.props.onSelect(new Date(date).getTime());
  };

  render() {
    const { classes } = this.props;
    return (
      <label className={classes.timeLabel}>
        <AddIcon className={classes.addIcon} />
        <DateTimePicker
          mode="24h"
          className={classes.picker}
          value={this.state.selectedDate}
          onChange={this.handleDateChange}
        />
      </label>
    );
  }
}

CustomDatePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomDatePicker);
