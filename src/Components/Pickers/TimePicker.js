import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    border: '2px solid #e0bf76'
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  label: {
    left: '32%',
    top: '2px'
  },
  items: {
    fontSize: 20
  },
  item: {
    paddingRight: '5px'
  }
});

class TimePicker extends React.Component {
  state = {
    hours: this.props.hours || 0,
    minutes: this.props.minutes || 0
  };

  handleChangeMinutes = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.changeMinutes(event.target.value);
  };

  handleChangeHours = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.changeHours(event.target.value);
  };

  createItems = amount => {
    let items = [];
    for (let i = 0; i < amount; i++) {
      items.push(<MenuItem key={i + amount} value={i}> {i < 10 ? `0${i}` : i} </MenuItem>)
    }
    return items;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="hours" className={classes.label}>Hours</InputLabel>
          <Select
            value={this.state.hours || this.props.hours}
            onChange={this.handleChangeHours}
            inputProps={{
              name: 'hours',
              id: 'hours',
            }}
            className={classes.items}
            MenuProps={MenuProps}
          >
            {this.createItems(12)}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="minutes" className={classes.label}>Minutes</InputLabel>
          <Select
            value={this.state.minutes || this.props.minutes}
            onChange={this.handleChangeMinutes}
            inputProps={{
              name: 'minutes',
              id: 'minutes',
            }}
            className={classes.items}
            MenuProps={MenuProps}
          >
            {this.createItems(60)}
          </Select>
        </FormControl>
      </div>
    );
  }
}

TimePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimePicker);
