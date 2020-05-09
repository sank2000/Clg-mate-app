import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";

const messages = [
  {
    id: 1,
    primary: "Operating System",
    secondary:
      "12 PM to 1 PM",
    person: "/static/images/avatar/5.jpg"
  },
  {
    id: 2,
    primary: "Object Oriented Programming",
    secondary: "2 PM to 3 PM",
    person: "/static/images/avatar/1.jpg"
  },
  {
    id: 3,
    primary: "Computer Design and Architecture",
    secondary: "2 PM to 3 PM",
    person: "/static/images/avatar/1.jpg"
  },
  {
    id: 4,
    primary: "Software Engineering",
    secondary: "2 PM to 3 PM",
    person: "/static/images/avatar/1.jpg"
  }
];

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0)
  },
  list: {
    marginBottom: theme.spacing(2)
  },
  subheader: {
    backgroundColor: theme.palette.background.paper
  },
  grow: {
    flexGrow: 1
  }
}));


export default function BottomAppBar() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Schedule
        </Typography>
        <List className={classes.list}>
          {messages.map(({ id, primary, secondary, person }) => (
            <React.Fragment key={id}>
              {id === 1 && (
                <ListSubheader className={classes.subheader}>Now</ListSubheader>
              )}
              {id === 2 && (
                <ListSubheader className={classes.subheader}>
                  Next
                </ListSubheader>
              )}
              {id === 3 && (
                <ListSubheader className={classes.subheader}>
                  Later
                </ListSubheader>
              )}
              <ListItem button>
                <ListItemAvatar>
                  <Avatar alt={id.toString()} src={person} />
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
}
