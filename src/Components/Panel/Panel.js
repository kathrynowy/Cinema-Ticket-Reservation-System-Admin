import React from 'react';
import { connect } from "react-redux";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ExitIcon from '@material-ui/icons/ExitToApp';
import MovieIcon from '@material-ui/icons/Movie';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Link } from "react-router-dom";
import { logOut } from '../../actions/auth'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 220,
    backgroundColor: theme.palette.background.paper,
    zIndex: 0,
    position: 'static'
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

class NestedList extends React.Component {
  logOut = () => {
    this.props.logOut();
  }

  render() {
    const { classes } = this.props;
    return (
      <List
        component="nav"
        subheader={<ListSubheader component="div" className={classes.root}>Menu</ListSubheader>}
        className={classes.root}
      >
        <Link to="/cinemas" className="cinemas_link">
          <ListItem button onClick={this.props.openCinemas}>
            <ListItemIcon>
              <HomeIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText inset primary="Cinemas" />
          </ListItem>
        </Link>

        <Link to="/movies" className="cinemas_link">
          <ListItem button>
            <ListItemIcon>
              <MovieIcon />
            </ListItemIcon>
            <ListItemText inset primary="Movies" />
          </ListItem>
        </Link>

        <Link to="/sessions" className="cinemas_link">
          <ListItem button>
            <ListItemIcon>
              <ScheduleIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText inset primary="Sessions" />
          </ListItem>
        </Link>


        <ListItem button onClick={this.logOut}>
          <ListItemIcon>
            <ExitIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText inset primary="Log out" />
        </ListItem>
      </List>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  logOut() {
    return dispatch(logOut());
  }
});

export default withStyles(styles)(connect(null, mapDispatchToProps)(NestedList));
