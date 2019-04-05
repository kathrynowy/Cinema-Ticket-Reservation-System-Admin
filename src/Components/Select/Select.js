import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';


const styles = theme => ({
  formControl: {
    [theme.breakpoints.up('xs')]: {
      maxWidth: 253,
    },

    margin: theme.spacing.unit,
    margin: 0,
    marginBottom: 25,
    marginTop: 5,
    color: 'white',
    display: 'flex',
    justifyContent: 'flex-start'
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  select: {
    height: 37,
    backgroundColor: 'white',
    color: 'black',
    '&:after': {
      border: 'none',
    },
    border: '2px solid #e7ce98',
    textAlign: 'start',
    paddingLeft: 8,
  },
  input: {
    color: 'white',
    fontSize: '20px',
    textAlign: 'center'
  }
});

class CustomSelect extends React.Component {
  handleChange = event => {
    this.props.onSelect(event.target.value);
  };

  handleClick = event => {
    console.log(event.target.value);
  }

  render() {
    const { classes } = this.props;

    return (
      <FormControl className={classes.formControl}>
        <Select
          className={classes.select}
          value={this.props.value}
          onChange={this.handleChange}
          onClick={this.handleClick}
          inputProps={{
            name: `${this.props.name}`,
            id: `select-${this.props.name}`,
          }}
        >
          {
            this.props.items.map(item => {
              return <MenuItem value={item} key={item.name}>{item.name}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    );
  }
}

CustomSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomSelect);
