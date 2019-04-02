import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    color: 'white'
  },
  formControl: {
    [theme.breakpoints.up('xs')]: {
      minWidth: 253,
    },

    margin: theme.spacing.unit,
    margin: 0,
    marginBottom: 25,
    marginTop: 5,
    color: 'white',
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
  state = {
    city: '',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.onSelectCity(event.target.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off" style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <FormControl className={classes.formControl}>
          <Select
            className={classes.select}
            value={this.state.city}
            onChange={this.handleChange}
            inputProps={{
              name: 'city',
              id: 'select-city',
            }}
          >
            {/* <MenuItem value="">
              <em>choose city</em>
            </MenuItem> */}
            {
              this.props.cities.map(city => {
                return <MenuItem value={city}>{city}</MenuItem>
              })
            }
          </Select>
        </FormControl>
      </form>
    );
  }
}

CustomSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomSelect);
