import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ScheduleIcon from '@material-ui/icons/Schedule';
import MovieIcon from '@material-ui/icons/Movie';
import SvgIcon from '@material-ui/core/SvgIcon';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 220,
    backgroundColor: theme.palette.background.paper,
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
  render() {
    const { classes } = this.props;

    return (
      <List
        component="nav"
        subheader={<ListSubheader component="div">Menu</ListSubheader>}
        className={classes.root}
      >
        <ListItem button onClick={this.props.openCinemas}>
          <ListItemIcon>
            <HomeIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText inset primary="Cinemas" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <MovieIcon />
          </ListItemIcon>
          <ListItemText inset primary="Movies" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <ScheduleIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText inset primary="Sessions" />
        </ListItem>
      </List>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);