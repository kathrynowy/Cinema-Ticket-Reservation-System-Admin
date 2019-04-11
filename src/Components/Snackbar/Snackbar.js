import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { hideSnackbar } from '../../actions/snackbar';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
    backgroundColor: theme.palette.secondary.dark,
  }
});

class CustomSnackbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }
  }

  componentWillReceiveProps(nextProps) {
    nextProps.isSnackbarOpen
      ? this.setState({ isOpen: true })
      : this.setState({ isOpen: false })
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ isOpen: false });
    this.props.hideSnackbar();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          className={classes.warning}
          open={this.state.isOpen}
          autoHideDuration={4000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  hideSnackbar() {
    dispatch(hideSnackbar());
  }
});

export default withStyles(styles)(connect(null, mapDispatchToProps)(CustomSnackbar));
