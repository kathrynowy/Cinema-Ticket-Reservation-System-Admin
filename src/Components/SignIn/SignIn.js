import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { signIn } from '../../actions/auth.js';
import { Avatar, Button, CssBaseline, FormControl, Input, InputLabel, Paper, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import { validateAll } from 'indicative';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },

  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    backgroundColor: "#ffffff"
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    border: "3px solid #f50057",
    borderRadius: 10,
    backgroundColor: "transparent"
  },
  errorLabel: {
    color: 'red',
    fontSize: 14,
    marginTop: 3
  }
});

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      errors: {}
    })
    const data = this.state;
    const rules = {
      email: 'required|email',
      password: 'required|string|min:6'
    }

    const messages = {
      required: 'This {{ field }} is required.',
      'email.email': 'The email is invalid.',
      'password.min': "Please, enter more, than 6 letters"
    }

    validateAll(data, rules, messages)
      .then(() => {
        this.props.signIn(data);
      })
      .catch(errors => {
        const formattesErrors = {};
        errors.forEach(error => formattesErrors[error.field] = error.message)
        this.setState({ errors: formattesErrors })
      })
  }

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleInputChange} />
              <span className={classes.errorLabel}>{this.state.errors ? this.state.errors.email : ''}</span>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleInputChange} />
              <span className={classes.errorLabel}>{this.state.errors ? this.state.errors.password : ''}</span>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  signIn(user) {
    dispatch(signIn(user));
  }
})

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(SignIn));
